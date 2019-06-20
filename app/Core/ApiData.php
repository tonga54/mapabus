<?php 

class ApiData
{

	public static function post($data_array){
		$make_call = ApiData::callAPI('POST', 'http://www.montevideo.gub.uy/buses/rest/stm-online', json_encode($data_array));
		//$response = json_decode($make_call, true);
		$response = $make_call;
		//$errors   = $response['response']['errors'];
		//$data     = $response['response']['data'][0];
		
		//print_r($response);
		return $response;
	}

	public static function callAPI($method, $url, $data){
	   $curl = curl_init();

	   switch ($method){
	      case "POST":
	         curl_setopt($curl, CURLOPT_POST, 1);
	         if ($data)
	            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	         break;
	      case "PUT":
	         curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
	         if ($data)
	            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
	         break;
	      default:
	         if ($data)
	            $url = sprintf("%s?%s", $url, http_build_query($data));
	   }

	   // OPTIONS:
	   curl_setopt($curl, CURLOPT_URL, $url);
	   curl_setopt($curl, CURLOPT_HTTPHEADER, array(
	      'Content-Type: application/json',
	   ));
	   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

	   // EXECUTE:
	   $result = curl_exec($curl);
	   if(!$result){die("Connection Failure");}
	   curl_close($curl);
	   return $result;
	}
	
}

 ?>