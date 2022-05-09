import React from "react";
import Table from 'react-bootstrap/Table';
import {Unit, useUnitContext} from "./UnitContext";
import edit from "../../../../../assets/images/edit.png";
import remove from "../../../../../assets/images/delete.png";
import {deleteUnits} from "../../redux/ServiceCRUD";
import Moment from 'moment';

const TableUnit: React.FC = () => {
    const {units, setUnits, setEditUnit} = useUnitContext();

    function handleEdit(e: any) {
        setEditUnit(e);
    }

    function handleDelete(e: any, index: number) {
        if (window.confirm(
            `Xóa "${e.name}" ?`,
        )) {
            deleteUnits(e).then((res) => {
                units.splice(index, 1);
                setUnits([...units]);
            });
        }
    }

    return (
        <>
            <div className="title">
                Danh sách đơn vị tính
            </div>
            <Table striped bordered hover>
                <thead className="text-center" style={{backgroundColor: "#f2f2f2"}
                }>
                <tr>
                    <th style={{width: '5%'}}>STT</th>
                    <th style={{width: '25%'}}>
                        Đơn vị tính
                    </th>
                    <th style={{width: '40%'}}>
                        Mô tả
                    </th>
                    <th style={{width: '15%'}}>
                        Ngày tạo
                    </th>
                    <th style={{width: '15%'}}>
                        Tác vụ
                    </th>
                </tr>
                </thead>
                <tbody>
                {units?.length > 0 ? (
                    units.map((unit: Unit, i: number) => (
                        <tr key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td>{unit.name}</td>
                            <td>{unit.description}</td>
                            <td className="text-center">{Moment(unit.createDate).format('DD/MM/yyyy')}</td>
                            <td className="text-center">
                                {unit.modified && <div>
                                    <img src={edit} alt="edit" onClick={() => {
                                        handleEdit(unit);
                                    }}/>
                                    <img src={remove} alt="remove" onClick={() => {
                                        handleDelete(unit, i);
                                    }}/>
                                </div>}

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

export default TableUnit;