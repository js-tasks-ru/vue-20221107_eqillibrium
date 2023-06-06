# Самостоятельный CounterButton

👶🏻 _Несложная задача_\
📚 _Закрепление материала_

<!--start_statement-->

Требуется последний раз реализовать компонент `CounterButton`.

- Входной параметр компонента - `count`, значение счётчика (число, по умолчанию 0);
- В кнопке выводится текущее значение счётчика;
- При клике компонент порождает событие обновления параметра `count` с увеличенным на 1 значением счётчика;
- **Компонент должен работать без обновления параметра родителем (без v-model и обработки события обновления);**
- **Компонент должен обновляться при изменении `count` родителем.**

<!--end_statement-->

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `components/CounterButton.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;\
приложение будет доступно на [http://localhost:8080/07-forms/01-CounterButtonComplete/](http://localhost:8080/07-forms/01-CounterButtonComplete/).

✅ Доступно автоматическое тестирование: `npm test CounterButtonComplete`.