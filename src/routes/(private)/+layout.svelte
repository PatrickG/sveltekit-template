<script lang="ts">
	import Breadcrumb from '$lib/components/breadcrumb/breadcrumb.svelte';
import Footer from '$lib/components/footer/footer.svelte';
	import Navigation from '$lib/components/navigation/navigation.svelte';
	import Sidebar from '$lib/components/sidebar/sidebar.svelte';
	const { data, children } = $props();
</script>

<Sidebar />
<div class="flex flex-col min-h-screen sm:gap-4 sm:py-4 sm:pl-14">
	<!-- <Navigation user={data.user} /> -->
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<header
			class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
		>
			<Breadcrumb />
		<header/>
	</div>
	<main class="m-4">
		{@render children()}
	</main>
	<Footer />
</div>