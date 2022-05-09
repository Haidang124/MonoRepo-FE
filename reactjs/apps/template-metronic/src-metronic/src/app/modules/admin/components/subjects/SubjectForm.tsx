import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {createSubjects, editSubjects, getSubjectsById} from "../../redux/SubjectCRUD";
import {useLocation, useNavigate} from "react-router-dom";
import {Subject} from "../courses/modal/CourseModal";
import {toast} from "react-toastify";
import Moment from "moment";

const SubjectForm: React.FC = () => {
    const {state} = useLocation();
    const navigate = useNavigate()
    const [subject, setSubject] = useState<Subject>();

    useEffect(() => {
        if (state)
            getSubjectsById(state).then((value) => {
                setSubject(value.data);
            })
    }, [state])

    function handleEdit() {
        editSubjects(subject).then((res) => {
            toast('Cập nhật môn học thành công');
            navigate(-1);
        })
    }

    function handleCreate() {
        const param = {
            name: subject?.name,
            description: subject?.description,
        }
        createSubjects(param).then((res) => {
            toast('Tạo môn học thành công');
            navigate(-1);
        })
    }

    const handleDataChange = (e: any) => {
        const newInfo = {...subject} as Subject
        newInfo.name = e.target.value
        setSubject(newInfo)
    }

    const handleDesChange = (e: any) => {
        const newInfo = {...subject} as Subject
        newInfo.description = e.target.value
        setSubject(newInfo)
    }

    const handleKeyPress = (e: any) => {
        const newInfo = {...subject} as Subject
        newInfo.description = e.target.value
        setSubject(newInfo)
    }

    return (
        <div className='row'>
            <div className={state ? "col-8" : ""}>
                <div className='SubjectForm'>
                    <div className='d-flex justify-content-between mb-5'>
                        <h3>
                            THÔNG TIN MÔN HỌC
                        </h3>
                        <div>
                            <Button className='btn btn-secondary' onClick={() => navigate(-1)}>
                                HỦY BỎ
                            </Button>
                            <Button
                                onClick={() => {
                                    state ? handleEdit() : handleCreate()
                                }}
                            >
                                {state ? 'CHỈNH SỬA' : 'TẠO MỚI'}
                            </Button>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label className='col-2 col-form-label required'>Tên môn học</label>
                        <div className='col-9'>
                            <input
                                key={'name'}
                                className='form-control'
                                value={subject?.name ?? ""}
                                onChange={handleDataChange}
                                placeholder='Nhập tên môn học'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <label className='col-2 col-form-label'>Mô tả</label>
                        <div className='col-9'>
                            <input
                                key={'des'}
                                className='form-control'
                                value={subject?.description ?? ""}
                                onChange={handleDesChange}
                                onKeyPress={(event) => handleKeyPress(event)}
                                placeholder='Mô tả chi tiết về môn học'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
                {state != null && (
                    <div className='subject-detail-info'>
                        <h3>
                            THÔNG TIN CHI TIẾT
                        </h3>
                        <div className='row mb-3 mt-5'>
                            <div className = 'col-4'>
                                Ngày tạo
                            </div>
                            <div className = 'col-8'>
                                {Moment(subject?.createDate).format('DD/MM/yyyy')}
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className = 'col-4'>
                                Người tạo
                            </div>
                            <div className = 'col-8'>
                                {subject?.createdBy.fullName}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SubjectForm
