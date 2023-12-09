const currencies = ['USD/RUB', 'EUR/USD']; 
let exchangeData = []; 
const arrr =[] 

// Асинхронная функция для получения и отображения обменных курсов
async function fetchAndDisplay() { 
  try { 
    const apiKey = '830514df1d592c13936a5dae731a31f5'; 
    const responses = await Promise.all(currencies.map(currency => 
      fetch(`https://open.er-api.com/v6/latest/${currency.split('/')[0]}?apikey=${apiKey}`) 
        .then(response => response.json()) 
    )); 

    const timestamp = new Date().toLocaleTimeString(); 
    arrr.push({'USD/RUB' : responses[0].rates.RUB ,'EUR/USD' : responses[1].rates.USD}) 

    // Вызов функции для обновления данных
    exchangeDataAdd(arrr ,timestamp)   
  } catch (error) { 
    console.error('Ошибка', error); 
  } 
} 

// Функция для добавления данных в массив и обновления интерфейса
function exchangeDataAdd(e, i) {
  e ? exchangeData.push([i, e]) : null;
  
  // Если в массиве более 11 элементов, удалить самый старый
  if (exchangeData.length > 11) {
    exchangeData.shift(); 
  }
  
  // Сохранение данных в локальном хранилище
  localStorage.setItem('last10', JSON.stringify(exchangeData));
  
  // Получение данных из локального хранилища
  let date = JSON.parse(localStorage.getItem('last10'));

  // Выборка последних 5 элементов для отображения
  const entriesToDisplay = date.slice(Math.max(date.length - 5, 0));
  
  // Очистка таблицы перед обновлением
  exchangeTable.innerHTML = ''; 
  
  // Обновление таблицы с последними 5 значениями
  entriesToDisplay.forEach(elem => {
    exchangeTable.innerHTML += `<tr>
      <th>${elem[0]}</th>
      <td>EUR/USD - ${elem[1][0]['EUR/USD']}</td>
      <td>USD/RUB - ${elem[1][0]['USD/RUB']}</td>
    </tr>`;
  });
}