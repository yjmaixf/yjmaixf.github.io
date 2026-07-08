<script setup>
import { ref } from "vue";
import { exampleGroups } from "../data/exampleContent";

const activeId = ref(exampleGroups[0].id);
</script>

<template>
  <section id="examples" class="examples-section">
    <div class="section-heading">
      <p class="section-kicker">Examples</p>
      <h2>按功能拆开的使用示例</h2>
      <p>保留正式官网的首页形态，同时补充组件库用户真正需要的接入说明、代码示例和参数表。</p>
    </div>

    <div class="examples-layout">
      <aside class="examples-nav" aria-label="功能示例导航">
        <button
          v-for="item in exampleGroups"
          :key="item.id"
          type="button"
          :class="{ active: activeId === item.id }"
          @click="activeId = item.id"
        >
          <span>{{ item.badge }}</span>
          {{ item.title }}
        </button>
      </aside>

      <div class="examples-content">
        <article
          v-for="item in exampleGroups"
          v-show="activeId === item.id"
          :key="item.id"
          class="example-doc"
        >
          <div class="example-intro">
            <span>{{ item.badge }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
          </div>

          <div class="example-code">
            <div class="code-title">
              <strong>示例代码</strong>
              <small>{{ item.title }}</small>
            </div>
            <pre><code>{{ item.code }}</code></pre>
          </div>

          <div class="example-api">
            <h4>参数说明</h4>
            <table>
              <thead>
                <tr>
                  <th>名称</th>
                  <th>类型 / 分类</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in item.api" :key="row.join('-')">
                  <td><code>{{ row[0] }}</code></td>
                  <td>{{ row[1] }}</td>
                  <td>{{ row[2] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
