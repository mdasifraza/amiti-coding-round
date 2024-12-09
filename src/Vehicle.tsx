import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { object, string, number } from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorMessage } from "@hookform/error-message"


interface VehicleInputs {
    vehicle_id: string;
    vin: string;
    make: string;
    model: string;
    year: number;
    image: any;
}

let VehicleValidationSchema = object({
    vehicle_id: string().required(),
    vin: string().required(),
    make: string().required(),
    model: string().required(),
    year: number().required().positive().integer(),
    image: string().required(),
});

const Vehicle = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<VehicleInputs>({
        resolver: yupResolver(VehicleValidationSchema)
    })

    const [vehicleData, setVehicleData] = useState<Array<any>>([])
    const [file, setFile] = useState<string|null>()

    const handleFileChange = (event: any) => {
        setFile(URL.createObjectURL(event?.target?.files?.[0]))
    }

    const onSubmit = (data: VehicleInputs) => {
        console.log(data)
        let prevData = vehicleData
        prevData.push({...data, image: file})
        reset()
        setFile(null)
    }
    // console.log(errors, vehicleData)
    return (
        <React.Fragment>
        <div>
            <h1>Vehicle Information Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Controller
                        control={control}
                        name="vehicle_id"
                        render={({ field: { onChange, onBlur } }) => (
                            <input
                                type="text"
                                placeholder='Enter Vehicle Id'
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    <ErrorMessage errors={errors} name="vehicle_id" />
                </div>

                <div>
                    <Controller
                        control={control}
                        name="vin"
                        render={({ field: { onChange, onBlur } }) => (
                            <input
                                type="text"
                                placeholder='Enter Vin'
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    <ErrorMessage errors={errors} name="vin" />
                </div>

                <div>
                    <Controller
                        control={control}
                        name="make"
                        render={({ field: { onChange, onBlur } }) => (
                            <input
                                type="text"
                                placeholder='Enter Make'
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    <ErrorMessage errors={errors} name="make" />
                </div>

                <div>
                    <Controller
                        control={control}
                        name="model"
                        render={({ field: { onChange, onBlur } }) => (
                            <input
                                type="text"
                                placeholder='Enter Model'
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    <ErrorMessage errors={errors} name="model" />
                </div>

                <div>
                    <Controller
                        control={control}
                        name="year"
                        render={({ field: { onChange, onBlur } }) => (
                            <input
                                type="number"
                                placeholder='Enter Year'
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    <ErrorMessage errors={errors} name="year" />
                </div>

                <div>
                    <Controller
                        control={control}
                        name="image"
                        render={({ field: { onChange, onBlur } }) => (
                            <input
                                type="file"
                                accept='image/png,image/jpg,image/jpeg'
                                placeholder='Enter Year'
                                onChange={(e)=>{onChange(e); handleFileChange(e); console.log('image',e)}}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    <ErrorMessage errors={errors} name="image" />
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>

        <div>
            <h1>List of Vehicle</h1>
            <table>
                <th>Vehicle Id</th>
                <th>Vin</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Image</th>
                {vehicleData?.map((item: VehicleInputs) => (
                    <tr>
                        <td>
                            <span>{item.vehicle_id}</span>
                        </td>
                        <td>
                            <span>{item.vin}</span>
                        </td>
                        <td>
                            <span>{item.make}</span>
                        </td>
                        <td>
                            <span>{item.model}</span>
                        </td>
                        <td>
                            <span>{item.year}</span>
                        </td>
                        <td><img src={item.image} alt="" /></td>
                    </tr>
                ))}
            </table>
        </div>
        </React.Fragment>
    )
}

export default Vehicle