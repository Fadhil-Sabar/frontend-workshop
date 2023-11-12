import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import MySwal from '../../utils/MySwal'

const User = () => {
    const sw = new MySwal()
    const [data, setData] = useState([])
    const [isInit, setIsInit] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({
        idUser: '',
        namaUser: '',
        username: '',
        password: '',
        level: 0
    })

    const columns = [
        {
            name: 'Nama',
            selector: row => row.nama,
            sortable: true,
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Level',
            selector: row => row.level,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row =>  (<>
                <Button variant='outline-warning' onClick={() => handleClickModal(row)}>
                    <i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant='outline-danger' onClick={() => handleClickDelete(row)}>
                    <i className="bi bi-trash"></i>
                </Button>
            </>)
        }
    ];

    const getData = useCallback(async () => {
        await axios.get('http://localhost:8000/api/getAllUser')
        .then((response) => {
            setIsInit(false)
            setData((prevState) => {
                return response.data.data
            })
        })
    }, [])

    const handleClickModal = useCallback((row) => {
        console.log("🚀 ~ file: index.js:59 ~ handleClickModal ~ row:", row)
        if(row){
            setForm({
                idUser: row.id_user,
                namaUser: row.nama,
                username: row.username,
                password: row.password,
                level: row.level
            })
        }

        if(showModal){
            setForm({
                idUser: '',
                namaUser: '',
                username: '',
                password: '',
                level: 0
            })
        }
        setShowModal(!showModal)
    }, [showModal])

    const handleChange = useCallback((event) => {
        // console.log(form.username)
        setForm((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }, [])

    const handleClickSave = useCallback(async () => {
        if(form.namaUser && form.username && form.password && form.level){
            if(form.idUser){
                await axios.put('http://localhost:8000/api/updateUser', {
                    id_user: form.idUser,
                    nama: form.namaUser,
                    username: form.username,
                    password: form.password,
                    level: form.level,
                })
                .then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        sw.success('Berhasil Update User')
                        handleClickModal()
                        setIsInit(true)
                        setForm({
                            idUser: '',
                            namaUser: '',
                            username: '',
                            password: '',
                            level: 0
                        })
                    }
                })
            }else{
                await axios.post('http://localhost:8000/api/createUser', {
                    nama: form.namaUser,
                    username: form.username,
                    password: form.password,
                    level: form.level,
                })
                .then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        sw.success('Berhasil Membuat User')
                        handleClickModal()
                        setIsInit(true)
                        setForm({
                            namaUser: '',
                            username: '',
                            password: '',
                            level: 0
                        })
                    }
                })
            }
        }else{
            sw.warning('Mohon Isi Semua Field')
        }
    }, [form.namaUser, form.username, form.password, form.level, form.idUser])

    const handleClickDelete = useCallback((row) => {
        sw.confirm('Apakah anda yakin ingin menghapus data ini')
        .then(async isConfirm => {
            if(isConfirm.value){
                await axios.delete('http://localhost:8000/api/deleteUser', {
                    params: {
                        id_user: row.id_user,
                    }
                })
                .then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        sw.success('Berhasil Menghapus User')
                        setIsInit(true)
                    }
                })
            }
        })
    }, [])

    useEffect(() => {
        if(isInit){
            getData()
        }
    }, [getData, isInit])

    return (
        <div>
            <Card>
                <Card.Header>
                    <Row>
                        <Col className='d-flex justify-content-start'>
                            User Page
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Button variant='outline-primary' onClick={() => handleClickModal()}>
                                Create New
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </Card.Body>
            </Card>

            <Modal
                show={showModal}
                onHide={() => handleClickModal()}
            >
                <Modal.Body>
                    <Form.Group className='py-2'>
                        <Form.Label>
                            Nama User
                        </Form.Label>
                        <Form.Control value={form.namaUser} name='namaUser' type='text' placeholder='Masukkan Nama User' onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className='py-2'>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control value={form.username} type='text' name='username' placeholder='Masukkan Username' onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className='py-2'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control value={form.password} type='password' name='password' placeholder='Masukkan Password' onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className='py-2'>
                        <Form.Label>
                            Level
                        </Form.Label>
                        <Form.Control value={form.level} max={3} type='number' name='level' placeholder='Masukkan Level User' onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Col className='d-flex justify-content-end'>
                        <Button variant='outline-danger' type='button' className='mx-3' onClick={() => handleClickModal()}>
                            Cancel
                        </Button>
                        <Button variant='outline-primary' type='button' className='' onClick={() => handleClickSave()}>
                            Save
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default User