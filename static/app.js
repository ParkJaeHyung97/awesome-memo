async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요.");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id, // js에서는 이런 상황에 그냥 id 써도 됨
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");

  const editBtn = document.createElement("button");
  li.innerText = `${memo.content}`;
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제하기";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
}

async function readMemo() {
  const res = await fetch("/memos"); //read는 get을 쓰기때문에 기본 GET요청으로 냅둠
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  //jsonRes = [{id:123,content:'blahblah'}]
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST", // 그냥 요청하면 GET요청이기때문에, 받아야 하는건 POST로 바꿔줘야함
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault(); // preventDefault 안하면 자동 새로고침
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
