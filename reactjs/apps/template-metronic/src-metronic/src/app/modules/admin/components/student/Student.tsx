import React from "react";
import StudentFilter from "./StudentFilter";
import './style/style.scss'
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";


const StudentView: React.FC = () => {
    return (
        <>
            <div className='student-view'>
                <div className='d-flex justify-content-between mb-5'>
                    <StudentFilter/>
                    <Link className='btn btn-primary btn-sm' to='/admin/studentDetail'>
                        TẠO MỚI
                    </Link>
                </div>
                <Table striped bordered hover>
                    <thead className="text-center"
                           style={{backgroundColor: "#ffffff", color: "#9b9b9b"}}>
                    <tr>
                        <th style={{width: '5%'}}>STT</th>
                        <th style={{width: '20%'}}>
                            HỌ TÊN
                        </th>
                        <th style={{width: '15%'}}>
                            NGÀY SINH
                        </th>
                        <th style={{width: '10%'}}>
                            ĐIỆN THOẠI
                        </th>
                        <th style={{width: '10%'}}>
                            LỚP HỌC
                        </th>
                        <th style={{width: '10%'}}>
                            TRẠNG THÁI
                        </th>
                        <th style={{width: '20%'}}>
                            NGƯỜI PHỤ TRÁCH
                        </th>
                        <th style={{width: '10%'}}>
                            TÁC VỤ
                        </th>
                    </tr>
                    </thead>
                </Table>

            </div>
        </>
    );
}

export default StudentView;