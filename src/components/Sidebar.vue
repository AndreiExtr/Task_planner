<template>
  <div class="container_sidebar">
    <div class="sidebar-logo">
      <img src="/src/assets/logo.png" alt="Logo">
      <div class="projects">
        <div :class="['project_3', activeProject === 'all' ? 'active' : '']" @click="selectProject('all')">ВСЕ</div>
        <div :class="['project_1', activeProject === 'ПРИСКОДОК' ? 'active' : '']" @click="selectProject('ПРИСКОДОК')">Проект №1</div>
        <div :class="['project_2', activeProject === 'СРВДИЗ' ? 'active' : '']" @click="selectProject('СРВДИЗ')">Проект №2</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeProject: 'all' // Устанавливаем активную кнопку по умолчанию
    };
  },
  methods: {
    selectProject(project) {
      this.activeProject = project;
      this.$emit('project-selected', project); // Эмитируем событие при выборе проекта
    }
  },
  mounted() {
    // Устанавливаем активной кнопку "ВСЕ" по умолчанию
    this.selectProject('all');
  }
}
</script>



<style scoped>
  .container_sidebar{
    background-color: #0a2f53;
    position: fixed;
    height: 100%;
  }

.sidebar-logo{
  text-align: center;
  width: 150px;
  height: auto;
}

.sidebar-logo img{
  margin: 24px;
  width: 60px;
  height: 60px;
}

.projects{
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-top: 24px;
}

.project_1,
.project_2,
.project_3{
  height: 50px;
  width: 100px;
  text-align: center;
  color: white;
  cursor: pointer;
  border: 1px solid #ffffff;
  line-height: 50px;
  font-size: 14px;
}

.project_1:hover,
.project_2:hover,
.project_3:hover {
  background-color: #f0f0f0; /* Цвет фона при наведении */
  color: black; /* Цвет текста при наведении */
}

  .active {
    background-color: #007bff; /* Цвет фона для активной кнопки */
    color: white; /* Цвет текста для активной кнопки */
  }
</style>