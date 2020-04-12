const todoRequests = {
	getTodos: () => {
		/*
		$.ajax({
			url: "/api/todos",
			contentType: "application/json",
			dataType: "json",
			success: (data) => {
				console.dir(data);
			}
		});
		*/
		// We can simplify into ...
		/*
		$.getJSON({
			url: "/api/todos",
			success: (data) => {
				console.dir(data);
			}
		})
		*/
		// And even further if we want to handle with a .then:
		
		const list = document.getElementById("todoList");
		
		$.getJSON("/api/todos").then((data) => {
			data.forEach((item) => {
				createTodoElement(list, item);
			});
			listenForTodoTaskClick();
			listenForTodoDeleteClick();
		});
	},
	
	createTodo: (name) => {
		$.post({
			url: "/api/todos",
			data: name,
			dataType: "json",
			success: (data) => {
				console.log(`Added ${data}`);
				const list = document.getElementById("todoList");
				createTodoElement(list, data);
			}
		})
	},
	
	updateTodo: (item) => {
		$.ajax({
			method: "PUT",
			url: `/api/todos/${item._id}`,
			data: item,
			dataType: "json",
			success: (data) => {
				console.log(`Updated ${data}`);
			}
		})
	},
		
	deleteTodo: (item) => {
		$.ajax({
			method: "DELETE",
			url: `/api/todos/${item._id}`,
			data: item,
			dataType: "json",
			success: (data) => {
				console.log(`Deleted ${data}`);
			}
		})
	}
}

const createTodoElement = (list, item) => {
	let listItem = document.createElement("li");
	listItem.setAttribute("uid", item._id);
	let listName = document.createTextNode(item.name);
	let deleteSpan = document.createElement("span");
	let deleteButton = document.createTextNode("X");
	deleteSpan.classList.add("delete");
	listItem.classList.add("task");
	if(item.isComplete) listItem.className += " done";
	
	deleteSpan.appendChild(deleteButton)
	listItem.appendChild(listName);
	listItem.appendChild(deleteSpan);
	list.appendChild(listItem);
	
}

const listenForTodoItemEntry = () => {
	document.getElementById("todoInput")
		.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
			if(this.value.length) {
				todoRequests.createTodo({ name: this.value });
				this.value = ""; // Clear input
			}
		}
	});
}

const listenForTodoTaskClick = () => {
	document.querySelectorAll('.task').forEach(t => {
	  t.addEventListener('click', e => {
		  e.target.classList.toggle("done");
		  let uid = e.target.getAttribute("uid");
		  
		  if(e.target.classList.contains("done")) {
			  todoRequests.updateTodo({
				  _id: uid,
				  isComplete: true
			  }
		 	);
		  } else {
			  todoRequests.updateTodo({
			  	_id: uid,
			  	isComplete: false
		  	});
		  }
	  });
	});
}

const listenForTodoDeleteClick = () => {
	document.querySelectorAll('.delete').forEach(t => {
	  t.addEventListener('click', e => {
		  e.stopPropagation(); // Prevents update call
		  
		  let uid = e.target.parentNode.getAttribute("uid");
		  todoRequests.deleteTodo({
			  _id: uid
		  });
		  e.target.parentNode.remove();
	  });
	});
}

$(document).ready(() => { // On DOM load
	listenForTodoItemEntry();
	todoRequests.getTodos();
});