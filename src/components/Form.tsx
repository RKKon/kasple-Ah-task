import React from "react";

const Form = ({ dataForm, setDataForm, onSubmitForm, errorNameMessage, errorAgeMessage, toggleOpenForm }) => {

  const onWrapperCloseForm = (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('form_wrapper') && !target.classList.contains('#add_user_form')) {
      toggleOpenForm();
    }
  }

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>,) => {
    const { name, value } = e.target
    setDataForm({ ...dataForm, [name]: value })
  }

  return (
    <div onClick={onWrapperCloseForm} className="form_wrapper">
      <form id="add_user_form" onSubmit={onSubmitForm}>
        <div onClick={toggleOpenForm} className="add_user_cross">×</div>
        <h3 className="form_h3">Заполните пожалуйста ФИО и возраст</h3>
        <label htmlFor="name">ФИО</label>
        <input className="add_user_input"
          type="text"
          name="name"
          id="name"
          value={dataForm.name}
          onChange={handleChangeForm}
          autoComplete="name"
          placeholder="Иван Иванов Иванович" />
        {errorNameMessage && <p className="error_message">Пожалуйста введите ФИО - Иванов Иван Иванович</p>}
        <label htmlFor="age">Возраст</label>
        <input className="add_user_input"
          type="text"
          name="age"
          id="age"
          value={dataForm.age}
          onChange={handleChangeForm}
          autoComplete="age"
          placeholder="Возраст" />
        {errorAgeMessage && <p className="error_message">Пожалуйста введите возраст</p>}
        <button type="submit" className="add_user_btn">Добавить</button>
      </form>
    </div>
  )
}

export default Form