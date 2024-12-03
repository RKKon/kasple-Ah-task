import React from "react"

const DeleteConfirmationModal = ({ onConfirmDel, onCancel }) => {
  return (
    <div className="thanks_modal">
      <p>Вы уверены, что хотите удалить пользователя?</p>
      <div onClick={onCancel} className="add_user_cross confirm_form_cross">×</div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={onConfirmDel} className="btn_confirm">Да</button>
        <button onClick={onCancel} className="btn_cancel">Нет</button>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal