import React, {createContext, useContext, useEffect, useState} from "react";
import {ServicePackage} from "../../models/ServicePackageModel";
import {getAllServicePackage, getUnits} from "../../redux/ServiceCRUD";
import {Unit} from "../service-unit/UnitContext";

// @ts-ignore
const ServicePackageContext = createContext<any>(null);

export const useServicePackageContext = () => {
    return useContext(ServicePackageContext);
};

export const ServicePackageConsumer = ServicePackageContext.Consumer;

export const ServicePackageProvider: React.FC = ({children}) => {

    const [servicePackages, setServicePackage] = useState<ServicePackage>();
    const [units, setUnits] = useState<Unit[]>();
    const [params, setParams] = useState({});

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = () => {
        getAllServicePackage(params).then((value) => {
            setServicePackage(value.data.data);
        });
        getUnits().then((value) => {
            setUnits(value.data);
        });
    }


    const value = {
        servicePackages,
        setServicePackage,
        units,
        setUnits,
        params,
        setParams
    };
    return (
        <ServicePackageContext.Provider value={value}>{children}</ServicePackageContext.Provider>
    );
};
