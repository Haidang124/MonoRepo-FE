import React from "react";
import {UnitProvider} from "./UnitContext";
import UnitInput from "./UnitInput";
import TableUnit from "./TableUnit";
import "./style/style.scss";

const ServiceUnit: React.FC = () => {
    return (
        <>
            <div className='ServiceUnit' style={{}}>
                <div className='unit-title'>
                    THIẾT LẬP ĐƠN VỊ TÍNH CHO DỊCH VỤ
                </div>
                <UnitProvider>
                    <UnitInput/>
                    <TableUnit/>
                </UnitProvider>
            </div>

        </>
    );
}

export default ServiceUnit;