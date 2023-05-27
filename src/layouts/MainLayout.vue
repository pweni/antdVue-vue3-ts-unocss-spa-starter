<template>
    <div>
        <a-layout style="min-height: 100vh; background-color: white">
            <!-- change sider v-if to 'true' to make siderbar display -->
            <a-layout-sider v-model:collapsed="collapsed" collapsible collapsed-width="56" v-if="false">
                <div class="sticky top-0">
                    <div>
                        <router-link to="/">
                            <div class="h-24 m-8 bg-#333333 text-center align-middle leading-18.4">Logo</div>
                        </router-link>
                    </div>
                    <a-menu v-model:selectedKeys="selectedMenu" mode="inline" theme="dark">
                        <a-menu-item key="1" class="!mt-0">
                            <home-filled></home-filled>
                            <span> <router-link to="/" /> Home</span>
                        </a-menu-item>
                        <!-- <a-menu-item key="2">
                            <desktop-outlined />
                            <span>Option 2</span>
                        </a-menu-item>
                        <a-sub-menu key="sub1">
                            <template #title>
                                <span>
                                    <user-outlined />
                                    <span>User</span>
                                </span>
                            </template>
                            <a-menu-item key="3">Tom</a-menu-item>
                            <a-menu-item key="4">Bill</a-menu-item>
                            <a-menu-item key="5">Alex</a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu key="sub2">
                            <template #title>
                                <span>
                                    <team-outlined />
                                    <span>Team</span>
                                </span>
                            </template>
                            <a-menu-item key="6">Team 1</a-menu-item>
                            <a-menu-item key="8">Team 2</a-menu-item>
                        </a-sub-menu>
                        <a-menu-item key="9">
                            <file-outlined />
                            <span>File</span>
                        </a-menu-item> -->
                    </a-menu>
                </div>
            </a-layout-sider>
            <a-layout style="background-color: white">
                <a-layout-header class="bg-white shadow px-0 z-999 sticky top-0 leading-64 !bg-transparent" v-if="global.isIndexPage">
                    <a-row justify="center">
                        <a-col :md="12" class="fcc <md:hidden">
                            <router-link to="/" class="text-24 w-full text-center"><experiment-outlined />DrugMatrix</router-link>
                        </a-col>
                        <a-col :sm="24" :md="12" class="fcc">
                            <a-menu mode="horizontal" v-model:selected-keys="selectedNav" class="text-16 w-full fcc !bg-transparent">
                                <a-menu-item key="1"><home-outlined /> <router-link to="/"> Home</router-link></a-menu-item>
                                <a-menu-item key="2"
                                    ><tool-outlined />
                                    Service
                                </a-menu-item>
                                <a-menu-item key="3"><question-outlined /> Help </a-menu-item>
                                <a-menu-item key="4"><contacts-outlined /> Contact</a-menu-item>
                            </a-menu>
                        </a-col>
                    </a-row>
                </a-layout-header>
                <a-layout-content class="md:pa-16 sm:pa-12 pa-8 bg-white">
                    <router-view />
                </a-layout-content>
                <a-divider dashed class="!mb-0"><scissor-outlined /></a-divider>
                <a-layout-footer style="text-align: center" class="bg-white" v-if="global.isIndexPage">
                    <p class="mb-0">
                        Copyright © 2023 All Rights Reserved by
                        <a href="http://home.scbdd.com" target="_blank">Computational Biology & Drug Design Group.</a>
                    </p>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>
<script lang="ts" setup>
import {
    ExperimentOutlined,
    HomeOutlined,
    ToolOutlined,
    QuestionOutlined,
    ContactsOutlined,
    HomeFilled,
    ScissorOutlined,
} from '@ant-design/icons-vue'
import { useGlobalStore } from 'stores/global'
const collapsed = ref(true)
const global = useGlobalStore()
global.isIndexPage = true
const selectedNav = ref<string[]>(['1'])
const selectedMenu = ref<string[]>([''])
</script>
<style></style>
