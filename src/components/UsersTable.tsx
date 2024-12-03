import React, { useState, memo, useEffect } from "react";
import { Button, Col, Row, Space, Table } from "antd";
import { v4 as uuidv4 } from 'uuid'
import { CloseCircleFilled, EditFilled } from '@ant-design/icons';
import Form from "./Form.tsx";
import usersData from "./UsersData.tsx";
import ThanksModal from "./ThanksModal.tsx";
import DeleteConfirmationModal from "./DeleteConfirmationModal.tsx";

export interface usersInterface {
  id: string;
  name: string;
  age: number | string;
  key?: string;
  actions?: (id: string) => void;

}

const MemoizedForm = memo(Form);

const UsersTable = () => {
  const [users, setUsers] = useState<usersInterface[]>(usersData);
  const [openedForm, setOpenedForm] = useState(false);
  const [dataForm, setDataForm] = useState({ name: '', age: '' });
  const [errorNameMessage, setErrorNameMessage] = useState(false);
  const [errorAgeMessage, setErrorAgeMessage] = useState(false);
  const [existUserId, setExistUserId] = useState('');
  const [isAddedUser, setIsAddedUser] = useState(false);
  const [userDeleteId, setUserDeleteId] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


  const toggleOpenForm = () => {
    setOpenedForm(!openedForm)
    setExistUserId('');
    setDataForm({ name: '', age: '' })
  }

  const onDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const onConfirmDeleteUser = (id) => {
    setUserDeleteId(id)
    setShowDeleteConfirmation(true)
  }

  const onChangeUser = (user: usersInterface) => {
    setDataForm({ ...user, age: user.age.toString() })
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true

    const isValidAge = /^\d+$/.test(dataForm.age.trim())
    const isValidName = /^[А-ЯЁа-яё]{2,} [А-ЯЁа-яё]{2,} [А-ЯЁа-яё]{2,}$/.test(dataForm.name.trim());

    if (!isValidAge) {
      isValid = false
      setErrorAgeMessage(true)
    } else setErrorAgeMessage(false)

    if (!isValidName) {
      isValid = false
      setErrorNameMessage(true)
    } else setErrorNameMessage(false)

    if (isValid) {
      if (existUserId) {
        setUsers(users.map(user => user.id === existUserId ? { ...user, name: dataForm.name, age: dataForm.age } : user));
      } else {
        setUsers([...users, { ...dataForm, id: uuidv4() }])
      }
      toggleOpenForm(); // close and clear form
      setIsAddedUser(true)
    }
  }

  const dataSource = users.map(user => ({ ...user, key: user.id }));

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
      filters: [
        { text: "Младше 18", value: 'under18' },
        { text: "18 и старше", value: 'older18' }
      ],
      onFilter: (value, record) => value === 'under18' ? record.age < 18 : record.age >= 18,
      sorter: (a, b) => a.age - b.age
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record: usersInterface) => (
        <Space size="middle">
          <Button className="btn_delete_user"
            icon={<CloseCircleFilled />}
            onClick={() => onConfirmDeleteUser(record.id)}>
            <span className="btn_delete_color">Удалить</span></Button>
          <Button className="btn_edit_user"
            icon={<EditFilled />} onClick={() => {
              toggleOpenForm();
              onChangeUser(record)
              setExistUserId(record.id)
            }}><span className="btn_edit_color">Редактировать</span></Button>
        </Space>
      )
    }
  ];

  useEffect(() => {
    if (isAddedUser) {
      const timer = setTimeout(() => setIsAddedUser(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAddedUser]);

  return (
    <>
      {openedForm && (<MemoizedForm
        dataForm={dataForm}
        errorNameMessage={errorNameMessage}
        errorAgeMessage={errorAgeMessage}
        setDataForm={setDataForm}
        onSubmitForm={onSubmitForm}
        toggleOpenForm={toggleOpenForm}
      />)}
      {showDeleteConfirmation && <DeleteConfirmationModal
        onConfirmDel={() => {
          onDeleteUser(userDeleteId);
          setShowDeleteConfirmation(false);
        }}
        onCancel={() => setShowDeleteConfirmation(false)}
      />}
      {isAddedUser && <ThanksModal />}
      <h1 className='h1'>Таблица пользователей</h1>
      <button onClick={() => toggleOpenForm()} className='btn'>Добавить пользователя</button>
      <Row>
        <Col xs={24} md={{ span: 14, offset: 5 }}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </>
  )
}

export default UsersTable