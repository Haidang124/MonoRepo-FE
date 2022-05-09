import React from "react";
import {SubjectProvider} from "./SubjectContext";
import "./style/style.scss";
import TableSubject from "./TableSubjects";

const SubjectView: React.FC = () => {
    return (
        <>
            <div className='subject'>
                <SubjectProvider>
                    <TableSubject/>
                </SubjectProvider>
            </div>

        </>
    );
}

export default SubjectView;