void function Budget() {
  const budgetForm = document.querySelector(".budget-form")
  if (!budgetForm) {
    return
  }

  budgetForm.addEventListener("submit", event => {
    event.preventDefault()
    event.stopPropagation()
    alert("Недостаточно данных для расчета. Ошибка получение учетных коэффичиентов")
  })

}()