// 1) Написать две функции для реализации AJAX запросов: getData и sendData
// 3) Реализовать получение данных из файла .json (прикреплен под видео)  через функцию getData
// 4) После получения объекта из файла .json должна произойти отправка данных (которые мы получили из файла .json) на URL через функцию sendData
// jsonplaceholder.typicode.com/posts
// 5) Ошибки должны быть обработаны
// При загрузке страницы сперва должно произойти получение данных из файла и после этого сразу отправка

//GET запрос
function getData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ошибка! Статус: ${response.status}`);
      }
      return response.json();
    })
    //.then(data => console.log(data))
    .catch(error => {
      console.error('Ошибка при получении данных (getData):', error);
      throw error; // Пробрасываем ошибку дальше, чтобы прервать цепочку выполнения
    });
}

// POST запрос
function sendData(url, data) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ошибка! Статус: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Ошибка при отправке данных (sendData):', error);
      throw error;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const dbUrl = './db.json';
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  const receivedData = getData(dbUrl);
  console.log(receivedData);

  const serverResponse = sendData(apiUrl, receivedData);
  console.log(serverResponse);
});