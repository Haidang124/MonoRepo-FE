import React from 'react'
import CourseProvider from './CourseContext'
import CourseTable from './CourseTable'
import CourseHeader from './CourseHeader'
import {KTCard} from "../../../../../_metronic/helpers";

const CoursePage: React.FC = () => {
    return (
        <CourseProvider>
            <KTCard>
                <CourseHeader />
                <CourseTable />
            </KTCard>
        </CourseProvider>
    )
}

export default CoursePage
