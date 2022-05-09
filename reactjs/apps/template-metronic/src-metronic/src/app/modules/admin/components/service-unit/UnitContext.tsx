import React, {createContext, useContext, useEffect, useState} from "react";
import {getUnits} from "../../redux/ServiceCRUD";

export interface UnitContextProps {
    units: Unit[];
    setUnits: (units: Unit[]) => void;
    editUnit?: Unit;
    setEditUnit: (unit?: Unit) => void;
}

const UnitContext = createContext<UnitContextProps>({} as UnitContextProps);

export const useUnitContext = () => {
    return useContext(UnitContext);
};

export const UnitConsumer = UnitContext.Consumer;

export interface Unit {
    id: string;
    name: string;
    description: string;
    createDate: Date;
    modified: boolean;
}

export const UnitProvider: React.FC = ({children}) => {

    const [units, setUnits] = useState<Unit[]>([]);
    const [editUnit, setEditUnit] = useState<Unit>();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = () => {
        getUnits().then((value) => {
            setUnits(value.data);
        });
    }


    const value = {
        units,
        setUnits,
        editUnit,
        setEditUnit
    };
    return (
        <UnitContext.Provider value={value}>{children}
        </UnitContext.Provider>
    );
};
