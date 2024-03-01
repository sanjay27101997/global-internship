
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);



    $firstname = $data->first_name;

    $lastname = $data->last_name;

    $email= $data->email;
    $dob= $data->dob;
    $parents_no = $data->parents_no;

    $student_no = $data->st_phoneNumber;

    $parents_email = $data->parents_email;
    $city = $data->city;
    $state = $data->state;

    $address = $data->address;

    $school_name = $data->school_name;
    $gpa = $data->gpa;
    $indented_major = $data->indented_major;
    $yourself = $data->yourself;
    // $ideas = $data->ideas;

    $reference = $data->reference;
    $reference_name = $data->reference_name;

    $reference_email = $data->referance_email;

    $awards = $data->awards;
    $achievement = $data->achievement;
   

    if (!empty($firstname)) {
        $location_data = array(
            'name' =>  $firstname ,
            'lastname' =>  $lastname,
            'email' => $email,
            'dob' => $dob,

            'stphonenumber' => $student_no,

            'parents_no' => $parents_no,
            'parents_email' => $parents_email,
            'city' => $city,
            'state' => $state,

            'address' => $address,


            'school_name' => $school_name,
            'gpa' => $gpa ,
            'indented_major' => $indented_major,
            'yourself' => $yourself,
            // 'ideas' => $ideas,


            'reference' => $reference ,
            'reference_name' => $reference_name,

            'referanceemail' => $reference_email,


            'awards' => $awards,
            'achievement' => $achievement,

            'status' => "Pending",
            'isActive' => "Yes",
            
           
        );
        $location_id = $db->add('registration_form', $location_data);

        if ($location_id > 0) {
            $request->meta = [
                "error" => false,
                "message" => 'Applied Successfully'
            ];
            $request->id = $location_id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Fields are missing'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Fields are missing'
    ];
}
echo json_encode($request);
