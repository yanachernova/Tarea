import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import Table from '../components/Table';

const Home = props => {
    const [task, setTask] = useState([])
    const [index, setIndex] = useState('')
    const [usario, setUsario] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [button, setButton] = useState(true)

    const submitValue = (e) => {
        e.preventDefault()
        var a = document.forms["Form"]["usario"].value;
        var b = document.forms["Form"]["descripcion"].value;
        if (a == null || a == "", b == null || b == "") {
            alert("Please Fill All Required Field");
            return false;
          }else{

        setTask([
            ...task,
            {
                id: task.length + 1,
                usario: usario,
                descripcion: descripcion
            }
        ]
        )
        reset()
    }
    }
    const reset = () => {
        setDescripcion("")
        setUsario("")
    }
    const deleteTask = (e) => {
        const newarr = task
        const newitems = newarr.filter(item => item !== e)
        setTask(newitems)
    }
    const pencil = (item, i) => {
        setButton(false)
        setUsario(item.usario)
        setDescripcion(item.descripcion)
        setIndex(i)
        console.log(item)
    }
    const updateTask = (e) => {
        e.preventDefault()
        var a = document.forms["Form"]["usario"].value;
        var b = document.forms["Form"]["descripcion"].value;
        if (a == null || a == "", b == null || b == "") {
            alert("Please Fill All Required Field");
            return false;
          }else{
        task[index].usario = usario
        task[index].descripcion = descripcion
        setButton(true)
        reset()
          }
    }

    return (
        <>
            <div className="container mt-3">
                <div className="row justify-content-between">
                    <div className="col-md-4">
                        <Form text={button? `Crear de tarea` : `Editar de tarea`} /* value={test} click={} *//>
                        <form onSubmit={button ? (e) => submitValue(e) : (e) => updateTask(e)} name="Form">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Usario</label>
                                <input type="asdn" name="usario" contentEditable="true" value={usario} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUsario(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Descripcion</label>
                                <input type="asd" name="descripcion" value={descripcion} className="form-control" id="exampleInputPassword1" onChange={(e) => setDescripcion(e.target.value)} />
                            </div>
                            <button type="submit" className={button ? `btn btn-primary` : `btn btn-warning`}>{button? `Agregar` : `Edit`}</button>

                            <button type="button" className={!button ? `btn btn-primary ml-3` : `d-none`} onClick={() => setButton(true)}>cancel</button>
                        </form>
                    </div>
                    <div className="col-md-7">
                        <table className="table table-striped">
                            <Table />
                            <tbody>
                                {
                                    task.length > 0 &&
                                    task.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.usario}</td>
                                                <td>{item.descripcion}</td>
                                                <td><i className="fas fa-pencil-alt mr-3" onClick={() => pencil(item, i)}></i><i className="fa fa-trash" aria-hidden="true" onClick={() => deleteTask(item)}></i></td>
                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
