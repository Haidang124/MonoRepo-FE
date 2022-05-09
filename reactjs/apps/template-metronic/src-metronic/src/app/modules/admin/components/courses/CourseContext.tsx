import type { Dispatch, SetStateAction } from "react";
import React, { createContext, useContext, useState } from "react";
import {Course} from "./modal/CourseModal";

export interface CourseContextProps {
    courses: Course[];
    setCourses: Dispatch<SetStateAction<Course[]>>;
}


const CourseContext = createContext<CourseContextProps>({} as CourseContextProps);

export const useCourseContext = () => useContext<CourseContextProps>(CourseContext);


const CourseProvider: React.FC = ({ children }) => {
    const [courses, setCourses] = useState<Course[]>();
    const value = {
        courses,
        setCourses
    }  as CourseContextProps;

    return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};

export default CourseProvider;
