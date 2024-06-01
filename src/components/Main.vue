<template>
  <Sidebar @project-selected="filterTasks" />
  <div class="container_main">
    <div class="container_main-content">
      <div class="title_page">
        <h3>Список задач</h3>
        <input type="text" placeholder="Поиск..." v-model="searchQuery" @input="searchTasks">
      </div>
      <div class="content_tasks">
        <div class="titles">
          <div class="title_block">
            <p>Номер</p>
          </div>
          <div class="title_block">
            <p>Статус</p>
          </div>
          <div class="title_block">
            <p>Наименование</p>
          </div>
          <div class="title_block">
            <p>Исполнитель</p>
          </div>
          <div class="title_block">
            <p>Дедлайн</p>
          </div>
        </div>
        <div v-for="task in filteredTasks" :key="task.id" class="task">
          <div class="task_block">
            <p>{{ task.shortTitle }}</p>
          </div>
          <div class="task_block">
            <p class="badge" :style="{ backgroundColor: task.statusColor }">{{ task.statusName }}</p>
          </div>
          <div class="task_block">
            <p>{{ task.fullTitle }}</p>
          </div>
          <div class="task_block">
            <p>{{ task.executiveEmployeeName }}</p>
          </div>
          <div class="task_block">
            <p>{{ new Date(task.deadline).toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      tasks: [],
      projectFilteredTasks: [],
      searchFilteredTasks: [],
      filteredTasks: [],
      selectedProject: null,
      searchQuery: ''
    };
  },
  mounted() {
    axios.get('http://localhost:3000/tasks')
        .then(response => {
          this.tasks = response.data;
          this.projectFilteredTasks = this.tasks;
          this.searchFilteredTasks = this.tasks;
          this.filteredTasks = this.tasks;
        })
        .catch(error => {
          console.error('Ошибка при загрузке задач:', error);
        });
  },
  methods: {
    filterTasks(project) {
      this.selectedProject = project;
      if (project === 'all') {
        this.projectFilteredTasks = this.tasks;
      } else {
        this.projectFilteredTasks = this.tasks.filter(task => {
          return task.projectShortTitle.trim() === project.trim();
        });
      }
      this.applyFilters();
    },
    searchTasks() {
      const query = this.searchQuery.toLowerCase();
      if (!query) {
        this.searchFilteredTasks = this.tasks;
      } else {
        this.searchFilteredTasks = this.tasks.filter(task => {
          return task.shortTitle.toLowerCase().includes(query) ||
              task.statusName.toLowerCase().includes(query) ||
              task.executiveEmployeeName.toLowerCase().includes(query);
        });
      }
      this.applyFilters();
    },
    applyFilters() {
      // Находим пересечение двух фильтрованных массивов
      this.filteredTasks = this.projectFilteredTasks.filter(task =>
          this.searchFilteredTasks.includes(task)
      );
    }
  }
}
</script>


<style scoped>
.container_main{
  width: 100%;
  padding: 24px;
  margin-left: 150px;
}

.container_main-content{
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  padding: 24px;
}

.content_tasks{
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.title_page{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.title_page input{
  height: 32px;
  width: 250px;
  padding: 5px;
  font-size: 16px;
  margin-left: 20px;
}

.titles{
  display: flex;
  flex-direction: row;
  padding: 0 8px;
}

.title_block{
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}

.title_block p{
  margin: 0;
}

.task{
  display: flex;
  gap: 16px;
  justify-content: space-between;
  flex-direction: row;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 14px;
}

.task_block{
  width: 100%;
  text-align: left;
}

.badge {
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  color: #fff;
}
</style>