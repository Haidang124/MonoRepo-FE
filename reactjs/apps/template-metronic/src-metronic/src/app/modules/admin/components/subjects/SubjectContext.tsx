import React, {createContext, useContext, useEffect, useState} from "react";
import {Subject} from "../courses/modal/CourseModal";
import {getSubjects} from "../../redux/SubjectCRUD";

export interface SubjectContextProps {
    subjects: Subject[];
    setSubjects: (Subjects: Subject[]) => void;
    editSubject?: Subject;
    setEditSubject: (Subject?: Subject) => void;
}

const SubjectContext = createContext<SubjectContextProps>({} as SubjectContextProps);

export const useSubjectContext = () => {
    return useContext(SubjectContext);
};

export const SubjectConsumer = SubjectContext.Consumer;



export const SubjectProvider: React.FC = ({children}) => {

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [editSubject, setEditSubject] = useState<Subject>();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = () => {
        getSubjects().then((value) => {
            setSubjects(value.data);
        });
    }


    const value = {
        subjects,
        setSubjects,
        editSubject,
        setEditSubject
    };
    return (
        <SubjectContext.Provider value={value}>{children}
        </SubjectContext.Provider>
    );
};
