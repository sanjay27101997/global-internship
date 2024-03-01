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
    $qtype = $_POST['qtype'];

    if($qtype=="blank"){
        $answer = $_POST['answer'];
        $course_id = $_POST['level_id'];
        $question = $_POST['question'];
        $questiontype = $_POST['questiontype'];

        $photo_name = $_FILES['questionfile'];
        $photo_upload = $core->upload_file($photo_name, '../uploads/', array('png', 'jpg', 'jpeg', 'mp3', 'mp4'));
        if ($photo_upload['status'] == 'success') {
            $questionfile = $photo_upload['path'];
        } else {
            $questionfile = '';
        }

        if (!empty($question)) {
            $location_data = array(
                'QType'=> $qtype,
                'LevelID' => $course_id,
                'Question' => $question,
                'QuestionType' => $questiontype,
                'Questionfile' => $questionfile,
                'Answer' => $answer,
                'CreatedAt' => $core->datetime
            );
            $location_id = $db->add('progressivequiz', $location_data);

            if ($location_id > 0) {
                $request->meta = [
                    "error" => false,
                    "message" => 'Question Added Successfully'
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
        echo json_encode($request);
        exit;
    }
    $questiontype = $_POST['questiontype'];
    $answertype = $_POST['answertype'];
    if ($answertype == "Text") {
        $course_id = $_POST['level_id'];
        $question = $_POST['question'];
        $optiona = $_POST['optiona'];
        $optionb = $_POST['optionb'];
        $optionc = $_POST['optionc'];
        $optiond = $_POST['optiond'];
        $answer = $_POST['answer'];
        $photo_name = $_FILES['questionfile'];
        $photo_upload = $core->upload_file($photo_name, '../uploads/', array('png', 'jpg', 'jpeg', 'mp3', 'mp4'));
        if ($photo_upload['status'] == 'success') {
            $questionfile = $photo_upload['path'];
        } else {
            $questionfile = '';
        }
        if (!empty($question)) {
            $location_data = array(
                'QType'=> $qtype,
                'LevelID' => $course_id,
                'Question' => $question,
                'Questionfile' => $questionfile,
                'OptionA' => $optiona,
                'OptionB' => $optionb,
                'OptionC' => $optionc,
                'OptionD' => $optiond,
                'Answer' => $answer,
                'CreatedAt' => $core->datetime,
                'QuestionType' => $questiontype,
                'AnswerType' => $answertype,

            );
            $location_id = $db->add('progressivequiz', $location_data);

            if ($location_id > 0) {
                $request->meta = [
                    "error" => false,
                    "message" => 'Question Added Successfully'
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
    }
    if ($answertype == "Image" || $answertype == "Audio") {
        $course_id = $_POST['level_id'];
        $question = $_POST['question'];
        $answer = $_POST['answer'];
        $photo_name = $_FILES['questionfile'];
        $photo_upload = $core->upload_file($photo_name, '../uploads/', array('png', 'jpg', 'jpeg', 'mp3', 'mp4'));
        if ($photo_upload['status'] == 'success') {
            $questionfile = $photo_upload['path'];
        } else {
            $questionfile = '';
        }

        $photo_name1 = $_FILES['optionafile'];
        $photo_upload1 = $core->upload_file($photo_name1, '../uploads/', array('png', 'jpg', 'jpeg', 'mp3', 'mp4'));
        if ($photo_upload1['status'] == 'success') {
            $optionafile = $photo_upload1['path'];
        } else {
            $optionafile = '';
        }


        $photo_name2 = $_FILES['optionbfile'];
        $photo_upload2 = $core->upload_file($photo_name2, '../uploads/', array('png', 'jpg', 'jpeg', 'mp3', 'mp4'));
        if ($photo_upload2['status'] == 'success') {
            $optionbfile = $photo_upload2['path'];
        } else {
            $optionbfile = '';
        }


        $photo_name3 = $_FILES['optioncfile'];
        $photo_upload3 = $core->upload_file($photo_name3, '../uploads/', array('png', 'jpg', 'jpeg', 'mp3', 'mp4'));
        if ($photo_upload3['status'] == 'success') {
            $optioncfile = $photo_upload3['path'];
        } else {
            $optioncfile = '';
        }


        $photo_name4 = $_FILES['optiondfile'];
        $photo_upload4 = $core->upload_file($photo_name4, '../uploads/', array('png', 'jpg', 'jpeg', 'mp3', 'mp4'));
        if ($photo_upload4['status'] == 'success') {
            $optiondfile = $photo_upload4['path'];
        } else {
            $optiondfile = '';
        }

        if (!empty($question)) {
            $location_data = array(
                'QType'=> $qtype,
                'LevelID' => $course_id,
                'Question' => $question,
                'Questionfile' => $questionfile,
                'OptionA' => $optionafile,
                'OptionB' => $optionbfile,
                'OptionC' => $optioncfile,
                'OptionD' => $optiondfile,
                'Answer' => $answer,
                'CreatedAt' => $core->datetime,
                'QuestionType' => $questiontype,
                'AnswerType' => $answertype,
            );
            $location_id = $db->add('progressivequiz', $location_data);

            if ($location_id > 0) {
                $request->meta = [
                    "error" => false,
                    "message" => 'Question Added Successfully'
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
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Fields are missing'
    ];
}
echo json_encode($request);
