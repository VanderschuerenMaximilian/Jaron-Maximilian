<template>
    <div class="flex justify-center items-center min-h-screen translate-y-[-100px]">
        <div class="flex flex-col">
            <h1 class="flex justify-center text-[150px] sm:text-[200px] font-bold color-primary-green translate-y-10">404</h1>
            <h2 class="flex justify-center text-[20px] sm:text-[30px] font-bold">Pagina niet gevonden</h2>
            <p class="flex justify-center max-w-[600px] text-[15px] sm:text-[20px] text-center">Het lijkt erop dat je een onbekende weg hebt genomen en ergens bent beland waar niets te vinden is. Misschien ben je verdwaald?</p>
            <RouterLink to="/" class="mx-auto text-[15px] sm:text-[20px] mt-4 p-4 bg-primary-green max-w-xs rounded-full text-slate-100 hover:opacity-80 button-focus">TERUG NAAR STARTSCHERM</RouterLink>
        </div>
    </div>
</template>