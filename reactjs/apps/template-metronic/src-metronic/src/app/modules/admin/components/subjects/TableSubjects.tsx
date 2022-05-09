import React from "react";
import Table from 'react-bootstrap/Table';
import edit from "../../../../../assets/images/edit.png";
import remove from "../../../../../assets/images/delete.png";
import Moment from 'moment';
import {useSubjectContext} from "./SubjectContext";
import {deleteSubjects} from "../../redux/SubjectCRUD";
import {Subject} from "../courses/modal/CourseModal";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const TableSubject: React.FC = () => {
    const {subjects, setSubjects} = useSubjectContext();
    const navigate = useNavigate()


    function handleDelete(e: any, index: number) {
        if (window.confirm(
            `Xóa "${e.name}" ?`,
        )) {
            deleteSubjects(e).then((res) => {
                subjects.splice(index, 1);
                setSubjects([...subjects]);
            });
        }
    }

    return (
        <>
            <div className='d-flex justify-content-between mb-5'>
                <h3>
                    Danh sách môn học
                </h3>
                <Button
                    className='btn-primary'
                    onClick={() => {
                        navigate(`/admin/subjectDetail`);
                    }}>
                    TẠO MỚI
                </Button>
            </div>

            <Table striped bordered hover>
                <thead className="text-center" style={{backgroundColor: "#f2f2f2"}}>
                <tr>
                    <th style={{width: '5%'}}>STT</th>
                    <th style={{width: '25%'}}>
                        Tên môn học
                    </th>
                    <th style={{width: '25%'}}>
                        Mô tả
                    </th>
                    <th style={{width: '20%'}}>
                        Người tạo
                    </th>
                    <th style={{width: '10%'}}>
                        Ngày tạo
                    </th>
                    <th style={{width: '10%'}}>
                        Tác vụ
                    </th>
                </tr>
                </thead>
                <tbody>
                {subjects?.length > 0 ? (
                    subjects.map((subject: Subject, i: number) => (
                        <tr key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td>{subject.name}</td>
                            <td>{subject.description}</td>
                            <td>{subject.createdBy.fullName ?? ""}</td>
                            <td className="text-center">{Moment(subject.createDate).format('DD/MM/yyyy')}</td>
                            <td className="text-center">
                                <div>
                                    <img src={edit} alt="edit" onClick={() => {
                                        navigate(`/admin/subjectDetail`, {state: subject.id})
                                    }}/>
                                    <img src={remove} alt="remove" onClick={() => {
                                        handleDelete(subject, i);
                                    }}/>
                                </div>

                            </td>
                        </tr>
                    ))

                ) : (<tr className="text-center">
                    <td colSpan={5}>
                        Chưa có dữ liệu!
                    </td>
                </tr>)}
                </tbody>
            </Table>
        </>
    );
}

export default TableSubject;