<?php
	include "websocket.class.php";
	
	class TennisServer extends WebSocket
	{
		function process($user, $msg)
		{
			if (substr($msg, -1) == '=')  //验证信息可靠性 过滤错误乱码
			{
				$msg = substr($msg, 0, -1);
				$this->say("< " . $msg);

				if (substr($msg, 0, 4) == 'code') {
                    $code = substr($msg, 5, -1);
                    $this->sendToAllScreen(substr('' . $user->socket, 13) . ',' . $msg);

                    if ($code == '12369') {
                        $this->sendToPat(substr('' . $user->socket, 13) . ',' . $msg, $user);
                    }
                } elseif (substr($msg, 0, 7) == 'donggan') {
                    $this->sendToAllUser(substr('' . $user->socket, 13) . ',' . $msg);
                } elseif (substr($msg, 0, 5) == 'maiba') {
                    $this->sendToAllUser(substr('' . $user->socket, 13) . ',' . $msg);
                } elseif (substr($msg, 0, 6) == 'screen') {
					$user->role = 'screen';
					$user->rid = substr($msg, 7);
					$this->writeUserSocketToUserSocket($user);
					$this->sendToAllUser('0,user,' . implode(',', $this->userSocket));  //特殊
				}
				else if (substr($msg, 0, 6) == 'handle')
				{
					$user->role = 'handle';
					$user->rid = substr($msg, 7);
					$this->writeUserSocketToUserSocket($user);
					$this->sendToAllUser('0,user,' . implode(',', $this->userSocket));  //特殊
				}
				else if (($user->role == 'screen') && (substr($msg, 0, 6) == 'target'))
				{
					//target,2
					$this->sendToPat(substr('' . $user->socket, 13) . ',' . $msg, $user);
				}
				else if (($user->role == 'handle') && (substr($msg, 0, 4) == 'move'))
				{
					//move
					$this->sendToPat(substr('' . $user->socket, 13) . ',' . $msg, $user);
				}
				else if (($user->role == 'handle') && (substr($msg, 0, 3) == 'hit'))
				{
					//hit,2120,-931
					$this->sendToPat(substr('' . $user->socket, 13) . ',' . $msg, $user);
				}
				else if (($user->role == 'screen') && (substr($msg, 0, 3) == 'end'))
				{
					//end,1
					$this->sendToPat(substr('' . $user->socket, 13) . ',' . $msg, $user);
				}
				else if (($user->role == 'handle') && (substr($msg, 0, 5) == 'throw'))
				{
					//throw
					$this->sendToPat(substr('' . $user->socket, 13) . ',' . $msg, $user);
				}
				else if (($user->role == 'handle') && (substr($msg, 0, 5) == 'begin'))
				{
					//begin,2120,-931
					$this->sendToPat(substr('' . $user->socket, 13) . ',' . $msg, $user);
				}
				else if (($user->role == 'screen') && (substr($msg, 0, 6) == 'newhit'))
				{
					//newhit,100,210,6,330,560
					$this->sendToAntScreen(substr('' . $user->socket, 13) . ',' . $msg, $user);
				}
				else if (($user->role == 'handle') && (substr($msg, 0, 5) == 'shake'))
				{
					//shake,1
					$this->sendToAllScreen(substr('' . $user->socket, 13) . ',' . $msg);
				}
				
			}
		}
		
		function sendToAllUser($msg)
		{
			$usersList = $this->users;
			foreach ($usersList as $user)
			{
				$this->sendToUser($msg, $user->socket);
			}
		}
		
		function sendToUser($msg, $sct)
		{
			$this->send($sct, $msg);
		}
		
		function sendToPat($msg, $user)
		{
			if ($user->role == 'screen')
			{
				$patId = $user->rid * 2 - 1;
			}
			else
			{
				$patId = $user->rid * 2 - 2;
			}
			$sct = $this->getSocketById($this->userSocket[$patId]);
			// $this->log($user->rid . ' ' . $patId . ' ' . $sct);
			$this->sendToUser($msg, $sct);
		}
		
		function sendToAntScreen($msg, $user)
		{
			if ($user->rid == 1)
			{
				$antId = 2;
			}
			else
			{
				$antId = 0;
			}
			$sct = $this->getSocketById($this->userSocket[$antId]);
			$this->log($user->rid . ' ' . $antId . ' ' . $sct);
			$this->sendToUser($msg, $sct);
		}
		
		function sendToAllScreen($msg)
		{
			$sct = $this->getSocketById($this->userSocket[0]);
			$this->sendToUser($msg, $sct);
			$sct = $this->getSocketById($this->userSocket[2]);
			$this->sendToUser($msg, $sct);
		}
		
		function writeUserSocketToUserSocket($user)
		{
			$id = $user->rid * 2 - 2 + (($user->role != 'screen') ? 1 : 0);
			// $this->log('Resource id #' . substr('' . $user->socket, 13) . '   ' . $id);
			$this->userSocket[$id] = substr('' . $user->socket, 13);
		}
	}
	
	include_once('config.php');
	$master = new TennisServer($host,$port);
?>