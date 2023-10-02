<template>
    <section class="w-full flex">
        <aside class="w-1/3 flex flex-col items-center">
            <div>
                <RouterLink to="/" class="overflow-hidden">
                    <picture>
                        <img src="../../assets/logo.jpg" alt="Logo" loading="lazy" class="w-52">
                    </picture>
                </RouterLink>
            </div>
            <ul>
                <li><RouterLink to="">Overview</RouterLink></li>
                <li><RouterLink to="">Finances</RouterLink></li>
                <li><RouterLink to="">Employees</RouterLink></li>
                <li><RouterLink to="">Visitors</RouterLink></li>
                <li><RouterLink to="">Attractions & Shops</RouterLink></li>
                <li><RouterLink to="">Animals</RouterLink></li>
                <li><RouterLink to="">Alerts</RouterLink></li>
                <li><button>Log Out</button></li>
            </ul>
        </aside>
        <RouterView />
    </section>
</template>