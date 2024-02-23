<template>
  <div>
    <i class="text" data-bs-toggle="modal" data-bs-target="#kanbanModal">Open Kanban Board</i>

    <div
      class="modal fade"
      id="kanbanModal"
      tabindex="-1"
      aria-labelledby="kanbanModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><b>Kanban Board</b></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input
                type="text"
                v-model="newTodo"
                class="form-control"
                placeholder="Enter new todo"
              />
              <button @click.prevent="addNewTodo" class="btn btn-primary mt-2">Add Todo</button>
            </div>

            <div class="container-fluid kanban-container">
              <div class="row">
                <div class="col">
                  <div class="card bg-light mb-3">
                    <div class="card-header bg-primary text-white">Todo</div>
                    <div class="card-body" v-on:drop.prevent="drop('todo')" v-on:dragover.prevent>
                      <div
                        class="border border-primary p-2 mb-2"
                        v-for="(task, index) in tasks.todo"
                        :key="task.id"
                        :draggable="true"
                        @dragstart="dragStart('todo', task, $event)"
                      >
                        {{ task.name }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="card bg-light mb-3">
                    <div class="card-header bg-warning">Progress</div>
                    <div
                      class="card-body"
                      v-on:drop.prevent="drop('progress')"
                      v-on:dragover.prevent
                    >
                      <div
                        class="border border-warning p-2 mb-2"
                        v-for="(task, index) in tasks.progress"
                        :key="task.id"
                        :draggable="true"
                        @dragstart="dragStart('progress', task, $event)"
                      >
                        {{ task.name }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="card bg-light mb-3">
                    <div class="card-header bg-success text-white">Done</div>
                    <div class="card-body" v-on:drop.prevent="drop('done')" v-on:dragover.prevent>
                      <div
                        class="border border-success p-2 mb-2"
                        v-for="(task, index) in tasks.done"
                        :key="task.id"
                        :draggable="true"
                        @dragstart="dragStart('done', task, $event)"
                      >
                        {{ task.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { supabase } from '@/components/lib/supabaseClient';
import { store } from '@/store/store';

export default defineComponent({
  name: 'TheKanbanBoard',

  created() {
    this.fetchTodos();
  },

  data() {
    return {
      tasks: {
        todo: [],
        progress: [],
        done: [],
      },
      newTodo: '',
      draggingTask: null,
    };
  },
  methods: {
    dragStart(list, task, event) {
      const taskId = task.id;
      this.draggingTask = { list, taskId };
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', '');
    },

    drop(list) {
      if (this.draggingTask && this.draggingTask.list !== list) {
        const movedTask = this.tasks[this.draggingTask.list].find(
          (task) => task.id === this.draggingTask.taskId,
        );
        if (movedTask) {
          // Remove the moved task from its current list
          this.tasks[this.draggingTask.list] = this.tasks[this.draggingTask.list].filter(
            (task) => task.id !== this.draggingTask.taskId,
          );
          // Add the moved task to the new list
          this.tasks[list].push(movedTask);

          this.updateTaskStatus(movedTask.id, list);
          this.fetchTodos();
        }
      }
      this.draggingTask = null;
    },

    async addNewTodo() {
      const username = store.getUsername();
      try {
        await supabase
          .from('kanban')
          .insert({
            username: username,
            task: this.newTodo,
            status: 'todo',
          })
          .then(() => {
            this.newTodo = '';
            this.fetchTodos();
          });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchTodos() {
      const username = store.getUsername();
      const { data, error } = await supabase.from('kanban').select('*').eq('username', username);
      if (error) {
        console.error('Error fetching todos:', error.message);
        return;
      }
      if (data) {
        this.tasks.todo = [];
        this.tasks.progress = [];
        this.tasks.done = [];
        data.forEach((todo) => {
          switch (todo.status) {
            case 'todo':
              this.tasks.todo.push({ id: todo.id, name: todo.task });
              break;
            case 'progress':
              this.tasks.progress.push({ id: todo.id, name: todo.task });
              break;
            case 'done':
              this.tasks.done.push({ id: todo.id, name: todo.task });
              break;
          }
        });
      }
    },

    async updateTaskStatus(taskId, status) {
      const username = store.getUsername();
      try {
        const { error } = await supabase
          .from('kanban')
          .update({ status: status })
          .eq(`id`, taskId)
          .eq(`username`, username);

        if (error) console.log(error);
      } catch (error) {
        console.error('Error updating task status:', error.message);
      }
    },
  },
});
</script>

<style scoped>
body {
  overflow: hidden;
}

.kanban-container {
  max-width: 90%;
  max-height: 90%;
}
</style>
