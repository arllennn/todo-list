const output = document.querySelector('.output')
const form = document.querySelector('form')
const input = document.querySelector('input')

let todos = []


const createTask = () => {
    const task = {
        id: new Date().toISOString(),
        message: input.value,
        status: false,
        date: new Date()
    }

    todos.push(task)
    renderTodos()
    input.value ? '' : alert('is empty')
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    createTask()

    if(input.value === '') return
    input.value = ''
    console.log(todos);
})

const renderTodos = () => {
    output.innerHTML = ''
    todos.forEach((el) => {
        const block = document.createElement('div')
        const message = document.createElement('p')
        const messageTwo = document.createElement('p')
        const date = document.createElement('p')
        const edit = document.createElement('button')
        const deleteBtn = document.createElement('button')
        const done = document.createElement('button')

        message.textContent = el.message
        edit.textContent = 'edit'
        deleteBtn.textContent = 'delete'
        done.textContent = 'done'
        date.textContent = generateDate(el.date)

        block.style.background = el.status ? 'red' : 'aqua'
        if(el.status === false){
            messageTwo.textContent = 'todo is not completed'
            deleteBtn.addEventListener('click', () => {
                deleteTodoFilter(el.id)
            })
        }else{
            messageTwo.textContent = 'todo is completed'
        }
        edit.addEventListener('click', () => {
            editTodo(el.id)
        })
     
        done.addEventListener('click', () => {
            doneTodo(el.id)
        })

        output.append(block)
        block.append(message, messageTwo, date,edit, deleteBtn, done)
    })

}




const editTodo = (id) => {
    const editedMessage = prompt('edit message')
    if(!editedMessage) return
    todos = todos.map(item => {
        if (id === item.id) {
            return { ...item, message: editedMessage }
        }
        return item
    })
    // todos = newTodos
    renderTodos()
}

// const deleteTodoSplice = (id) => {
//     const index = todos.findIndex(el => el.id === id)
//     const newTodos = [...todos]
//     newTodos.splice(index, 1)
//     todos = newTodos
//     renderTodos()
// }

// [{1},{2},{3}] - todos
// [{1},{2}]
// {1} - true
// {2} - true
// {3} - false

const deleteTodoFilter = (id) => {
    todos = todos.filter(el => el.id !== id)
    renderTodos()
}

const doneTodo = (id) => {
    todos = todos.map(item => {
        if (id === item.id) {
            return { ...item, status: !item.status} 
        }
        return item
    })
    // todos = newTodos
    console.log(todos)
    renderTodos()
}

const generateDate = (date) => {

    const day = new Date().getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const generateZeroToDate = (time) => {
        return time < 10 ? '0' + time : time
    }
    const arr = [minutes, seconds, day]
    arr.forEach(el => {
        generateZeroToDate(el)
    })

    return `Date: ${newDays}-${month}-${year} ${hours}:${newMinutes}:${newSeconds}`
}


// 0)если статус true пусть отрисует todo is completed,
//  если false todo is not completed
// 1)Отрисовать дату по человечески
// 2)После добавления новой тудушки input очищается
// 3)input не должен принимать пустоту
// 4)Реализовать удаление тудушки
// 5)Удаление тудушки после Done(status:true)
// 6)Реализовать редактирование тудушки
//  1.prompt не принимаеи пустоту и null
// 7)редактирование не работает после Done(status:true)
// 8)Вместо кнопок поставить картинки-иконки
// 9)После Done(status:true) текст должен перечеркнутся
// 10)Созданная вами тудушка должна появится первой в списке
// 11)Пронумеровать ваши тудушки
// 12)Создать кнопку, которая очистит все тудушки
// 13)2/3 todos is done
// 14)Стилизовать
// 15)Залить в гитхаб