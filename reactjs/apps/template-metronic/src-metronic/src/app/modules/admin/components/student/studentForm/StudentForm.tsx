import React from "react";
import './style/style.scss'
import StudentInfo from "./StudentInfo";
import Academic from "./Academic";
import ParentsInfo from "./ParentsInfo";
import DetailInfo from "./DetailInfo";

const StudentForm: React.FC = () => {

    return (
        <div className='row'>
            <div className='student-form col-lg-8'>
                <h2>TẠO HỌC VIÊN MỚI</h2>
                <StudentInfo/>
                <Academic/>
                <ParentsInfo/>
            </div>
            <div className='col'>
                <DetailInfo/>
            </div>
        </div>
       
    )
}

export default StudentForm;