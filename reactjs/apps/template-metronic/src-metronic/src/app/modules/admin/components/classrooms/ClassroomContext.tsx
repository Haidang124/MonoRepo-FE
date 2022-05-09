import type { Dispatch, SetStateAction } from "react";
import React, { createContext, useContext, useState } from "react";
import {Classroom} from "./modal/ClassroomModal";

export interface ClassroomContextProps {
    classrooms: Classroom[];
    setClassrooms: Dispatch<SetStateAction<Classroom[]>>;
}


const ClassroomContext = createContext<ClassroomContextProps>({} as ClassroomContextProps);

export const useClassroomContext = () => useContext<ClassroomContextProps>(ClassroomContext);


const ClassroomProvider: React.FC = ({ children }) => {
    const [classrooms, setClassrooms] = useState<Classroom[]>();
    const value = {
        classrooms,
        setClassrooms
    }   as ClassroomContextProps;

    return <ClassroomContext.Provider value={value}>{children}</ClassroomContext.Provider>;
};

export default ClassroomProvider;
