<html lang="en" class="h-full dark" data-sentry-component="RootLayout" data-sentry-source-file="layout.tsx" style="color-scheme: dark;"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/_next/static/css/31e1255d9421281a.css?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H" data-precedence="next"><link rel="stylesheet" href="/_next/static/css/df328381cf84596e.css?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H" data-precedence="next"><link rel="preload" as="script" fetchpriority="low" href="/_next/static/chunks/webpack-130d8d05cf8d16ef.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H"><script src="/_next/static/chunks/c023d9eb-1d06dfcd4a82b3f0.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H" async=""></script><script src="/_next/static/chunks/9981-5b0349178316a346.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H" async=""></script><script src="/_next/static/chunks/main-app-b07df1d479c9fd54.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H" async=""></script><script src="/_next/static/chunks/app/layout-2d1cf1493cc61052.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H" async=""></script><title>Helper Widget</title><meta name="description" content="Powered by Helper"><link rel="manifest" href="/app.webmanifest"><link rel="icon" href="/favicon.ico" type="image/x-icon"><script>document.querySelectorAll('body link[rel="icon"], body link[rel="apple-touch-icon"]').forEach(el => document.head.appendChild(el))</script><script src="/_next/static/chunks/polyfills-42372ed130431b0a.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H" nomodule=""></script><script src="/_vercel/insights/script.js" defer="" data-sdkn="@vercel/analytics/react" data-sdkv="1.5.0"></script></head><body class="h-full antialiased text-foreground bg-background"><script>((e,t,n,r,o,a,i,s)=>{let l=document.documentElement,u=["light","dark"];function c(t){var n;(Array.isArray(e)?e:[e]).forEach(e=>{let n="class"===e,r=n&&a?o.map(e=>a[e]||e):o;n?(l.classList.remove(...r),l.classList.add(a&&a[t]?a[t]:t)):l.setAttribute(e,t)}),n=t,s&&u.includes(n)&&(l.style.colorScheme=n)}if(r)c(r);else try{let e=localStorage.getItem(t)||n,r=i&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;c(r)}catch(e){}})("class","theme","system",null,["light","dark"],null,true,true)</script><main class="light" data-sentry-component="EmbedLayout" data-sentry-source-file="layout.tsx"><style>
    :root,
    .light,
    .dark {
      --sidebar-width: 280px;
      --sidebar-width-mobile: 100%;
      --sidebar-background: #ffffff;
      --sidebar-foreground: #000000;
      --sidebar-primary: #ffffff;
      --sidebar-primary-foreground: #000000;
      --sidebar-accent: color-mix(in srgb, #000000 20%, transparent);
      --sidebar-accent-foreground: #000000;
      --sidebar-border: color-mix(in srgb, #000000 20%, #ffffff);
      --sidebar-ring: color-mix(in srgb, #000000 50%, #ffffff);
      --background: #ffffff;
      --foreground: #000000;
      --card: #ffffff;
      --card-foreground: #000000;
      --popover: #ffffff;
      --popover-foreground: #000000;
      --primary: #000000;
      --primary-foreground: #ffffff;
      --secondary: color-mix(in srgb, #000000 20%, #ffffff);
      --secondary-foreground: #000000;
      --muted: color-mix(in srgb, #000000 10%, #ffffff);
      --muted-foreground: #000000;
      --accent: #000000;
      --accent-foreground: #ffffff;
      --border: color-mix(in srgb, #000000 20%, #ffffff);
      --input: color-mix(in srgb, #000000 20%, #ffffff);
      --ring: color-mix(in srgb, #000000 50%, #ffffff);
      --bright: #000000;
      --bright-foreground: #ffffff;
    }
  </style><div class="light flex h-screen w-full flex-col responsive-chat max-w-full sm:max-w-[720px] bg-gumroad-bg"><div class="flex items-start justify-between border-b border-black p-1.5"><div class="flex items-center h-full"><div class="ml-2 flex flex-col gap-0.5"><h2 class="text-base leading-5 text-foreground">Support</h2></div></div><div class="flex items-center gap-2"><button class="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted" aria-label="Start new conversation" data-state="closed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor"></rect><path d="M8 12H16M12 8V16" stroke-width="2" stroke-linecap="round" style="stroke: var(--background);"></path></svg></button><button class="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted" aria-label="Show previous conversations" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history h-5 w-5" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg></button><button class="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted" aria-label="Minimize widget" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize2 lucide-minimize-2 h-5 w-5" aria-hidden="true"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" x2="21" y1="10" y2="3"></line><line x1="3" x2="10" y1="21" y2="14"></line></svg></button><button class="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted" aria-label="Close chat" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-5 w-5" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button></div></div><div class="relative flex-1 overflow-hidden"><div class="absolute inset-0 flex" data-sentry-element="m.div" data-sentry-source-file="page.tsx" style="transform: translateX(-100%);"><div class="shrink-0 w-full h-full"><div class="h-full overflow-y-auto p-4"></div></div><div class="shrink-0 w-full h-full flex flex-col"><div class="flex-1 overflow-y-auto p-4 [scrollbar-color:var(--scrollbar-color,rgba(0,0,0,0.4))_transparent] [&amp;::-webkit-scrollbar]{height:4px} [&amp;::-webkit-scrollbar-thumb]{background:rgba(0,0,0,0.4)} dark:[&amp;::-webkit-scrollbar-thumb]{background:rgba(0,0,0,0.4)} dark:[--scrollbar-color:rgba(0,0,0,0.4)]" id="message-container" data-sentry-component="MessagesList" data-sentry-source-file="MessagesList.tsx"><div class="flex flex-col gap-3"><div class="flex flex-col gap-2 ml-9 items-end" data-sentry-component="Message" data-sentry-source-file="Message.tsx"><div class="rounded-lg max-w-full bg-primary text-primary-foreground"><div class="relative p-4" data-sentry-component="MessageElement" data-sentry-source-file="MessageElement.tsx"><div class="prose prose-sm max-w-none text-sm text-primary-foreground **:text-primary-foreground"><p>hi</p></div></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-400" title="7/2/2025, 9:51:12 PM"><span title="Wednesday, July 2, 2025 at 09:51:12 PM" data-sentry-component="HumanizedTime" data-sentry-source-file="humanizedTime.tsx">32m</span></span></div></div><div class="flex flex-col gap-2 mr-9 items-start" data-sentry-component="Message" data-sentry-source-file="Message.tsx"><div class="rounded-lg max-w-full border border-black bg-background text-foreground"><div class="relative p-4" data-sentry-component="MessageElement" data-sentry-source-file="MessageElement.tsx"><div class="prose prose-sm max-w-none text-sm text-foreground **:text-foreground"><p>Hello! How can I help you with your Gumroad account or products today?</p></div></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-400" title="7/2/2025, 9:51:13 PM"><span title="Wednesday, July 2, 2025 at 09:51:13 PM" data-sentry-component="HumanizedTime" data-sentry-source-file="humanizedTime.tsx">32m</span></span></div></div><div class="flex flex-col gap-2 ml-9 items-end" data-sentry-component="Message" data-sentry-source-file="Message.tsx"><div class="rounded-lg max-w-full bg-primary text-primary-foreground"><div class="relative p-4" data-sentry-component="MessageElement" data-sentry-source-file="MessageElement.tsx"><div class="prose prose-sm max-w-none text-sm text-primary-foreground **:text-primary-foreground"><p>hi</p></div></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-400" title="7/2/2025, 9:55:59 PM"><span title="Wednesday, July 2, 2025 at 09:55:59 PM" data-sentry-component="HumanizedTime" data-sentry-source-file="humanizedTime.tsx">27m</span></span></div></div><div class="flex flex-col gap-2 mr-9 items-start" data-sentry-component="Message" data-sentry-source-file="Message.tsx"><div class="rounded-lg max-w-full border border-black bg-background text-foreground"><div class="relative p-4" data-sentry-component="MessageElement" data-sentry-source-file="MessageElement.tsx"><div class="prose prose-sm max-w-none text-sm text-foreground **:text-foreground"><p>Hello! How can I help you with your Gumroad account or products today?</p></div></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-400" title="7/2/2025, 9:56:00 PM"><span title="Wednesday, July 2, 2025 at 09:56:00 PM" data-sentry-component="HumanizedTime" data-sentry-source-file="humanizedTime.tsx">27m</span></span></div></div><div class="flex flex-col gap-2 ml-9 items-end" data-sentry-component="Message" data-sentry-source-file="Message.tsx"><div class="rounded-lg max-w-full bg-primary text-primary-foreground"><div class="relative p-4" data-sentry-component="MessageElement" data-sentry-source-file="MessageElement.tsx"><div class="prose prose-sm max-w-none text-sm text-primary-foreground **:text-primary-foreground"><p>dsdsdds</p></div></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-400" title="7/2/2025, 10:20:37 PM"><span title="Wednesday, July 2, 2025 at 10:20:37 PM" data-sentry-component="HumanizedTime" data-sentry-source-file="humanizedTime.tsx">2m</span></span></div></div><div class="flex flex-col gap-2 mr-9 items-start" data-sentry-component="Message" data-sentry-source-file="Message.tsx"><div class="rounded-lg max-w-full border border-black bg-background text-foreground"><div class="relative p-4" data-sentry-component="MessageElement" data-sentry-source-file="MessageElement.tsx"><div class="prose prose-sm max-w-none text-sm text-foreground **:text-foreground"><p>It looks like your message might have been a typo. How can I assist you with Gumroad? If you have a question or need help, just let me know!</p></div></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-400" title="7/2/2025, 10:20:39 PM"><span title="Wednesday, July 2, 2025 at 10:20:39 PM" data-sentry-component="HumanizedTime" data-sentry-source-file="humanizedTime.tsx">2m</span></span></div></div><div class="flex flex-col gap-2 ml-9 items-end" data-sentry-component="Message" data-sentry-source-file="Message.tsx"><div class="rounded-lg max-w-full bg-primary text-primary-foreground"><div class="relative p-4" data-sentry-component="MessageElement" data-sentry-source-file="MessageElement.tsx"><div class="prose prose-sm max-w-none text-sm text-primary-foreground **:text-primary-foreground"><p>dsdsd</p></div></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-400" title="7/2/2025, 10:20:44 PM"><span title="Wednesday, July 2, 2025 at 10:20:44 PM" data-sentry-component="HumanizedTime" data-sentry-source-file="humanizedTime.tsx">2m</span></span></div></div><div class="flex flex-col gap-2 mr-9 items-start" data-sentry-component="Message" data-sentry-source-file="Message.tsx"><div class="rounded-lg max-w-full border border-black bg-background text-foreground"><div class="relative p-4" data-sentry-component="MessageElement" data-sentry-source-file="MessageElement.tsx"><div class="prose prose-sm max-w-none text-sm text-foreground **:text-foreground"><p>It seems like your message might be incomplete. If you have a question or need help with something on Gumroad, please let me know how I can assist you!</p></div></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-400" title="7/2/2025, 10:20:46 PM"><span title="Wednesday, July 2, 2025 at 10:20:46 PM" data-sentry-component="HumanizedTime" data-sentry-source-file="humanizedTime.tsx">2m</span></span></div></div></div></div><div class="flex justify-center gap-4 py-3" data-sentry-element="motion.div" data-sentry-component="SupportButtons" data-sentry-source-file="SupportButtons.tsx" style="opacity: 1; transform: none;"><button class="flex items-center gap-2 rounded-full border border-green-500 bg-green-100 text-green-700 px-4 py-2 text-sm  transition-colors duration-200"><div class="w-4 h-4 origin-bottom-left" data-sentry-element="motion.div" data-sentry-source-file="SupportButtons.tsx" style="transform: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up h-4 w-4 text-green-600" aria-hidden="true" data-sentry-element="ThumbsUp" data-sentry-source-file="SupportButtons.tsx"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path></svg></div>That solved it!</button><button class="flex items-center gap-2 rounded-full border border-gray-400 text-black px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"><div class="w-4 h-4 origin-center" style="transform: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square h-4 w-4" aria-hidden="true"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg></div>Talk to a human</button></div><div class="border-t border-black p-4 bg-white" data-sentry-component="ChatInput" data-sentry-source-file="ChatInput.tsx"><form class="flex flex-col gap-2"><div class="flex-1 flex items-start"><textarea class="w-full rounded-lg border-border text-sm focus:border-transparent focus:ring-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 self-stretch max-w-md placeholder:text-muted-foreground text-foreground flex-1 resize-none border-none bg-white p-0 pr-3 outline-hidden focus:border-none focus:outline-hidden focus:ring-0 min-h-[24px] max-h-[200px]" aria-label="Ask a question" placeholder="Ask a question..." data-sentry-element="Textarea" data-sentry-source-file="textarea.tsx" data-sentry-component="Textarea" style="height: 40px;"></textarea><div class="flex items-center gap-2"><button type="button" class="text-primary hover:text-muted-foreground p-2 rounded-full hover:bg-muted" aria-label="Dictate" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic w-4 h-4 text-primary" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg></button><div class="relative" data-sentry-component="ShadowHoverButton" data-sentry-source-file="ShadowHoverButton.tsx"><button type="submit" aria-label="Send message" class="relative z-10 flex h-8 w-8 items-center justify-center rounded-md bg-primary text-2xl text-primary-foreground transition-all duration-300 ease-in-out hover:border hover:border-black hover:bg-[#FF90E7] hover:text-black  "><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send h-3.5 w-3.5 -rotate-90" aria-hidden="true" data-sentry-element="Send" data-sentry-source-file="ShadowHoverButton.tsx"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg></button><div class="absolute left-0 top-0 h-8 w-8 rounded-md bg-black transition-all duration-300 ease-in-out"></div></div></div></div></form></div></div></div></div></div><!--$--><!--/$--><!--$--><!--/$--></main><script src="/_next/static/chunks/webpack-130d8d05cf8d16ef.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H" async=""></script><script>(self.__next_f=self.__next_f||[]).push([0])</script><script>self.__next_f.push([1,"1:\"$Sreact.fragment\"\n2:I[98118,[\"7177\",\"static/chunks/app/layout-2d1cf1493cc61052.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\"],\"ThemeProvider\"]\n3:I[42029,[],\"\"]\n4:I[90521,[],\"\"]\n5:I[66060,[\"5106\",\"static/chunks/5106-21a71732f1792f72.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"6144\",\"static/chunks/6144-1581e3ca752f74a4.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"6488\",\"static/chunks/6488-5e946d1cd8e69f84.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"4345\",\"static/chunks/app/not-found-929c6fb070c8db38.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\"],\"default\"]\n6:I[60509,[\"3185\",\"static/chunks/app/(embed)/widget/layout-21efb83cca166391.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\"],\"Analytics\"]\n7:I[49495,[\"3185\",\"static/chunks/app/(embed)/widget/layout-21efb83cca166391.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\"],\"NuqsAdapter\"]\n8:I[2884,[],\"ClientPageRoot\"]\n9:I[43485,[\"5106\",\"static/chunks/5106-21a71732f1792f72.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"7867\",\"static/chunks/7867-c7eb17a554a55d5b.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"5396\",\"static/chunks/5396-89e934674fd55657.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"30\",\"static/chunks/30-cd8b84870ddd27a8.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"4287\",\"static/chunks/4287-37886ff9b4b3a10e.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"2892\",\"static/chunks/2892-45fba950c282168e.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"5126\",\"static/chunks/5126-5add58fbdc0df4c3.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"2177\",\"static/chunks/2177-cba7d070ac83048d.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"6196\",\"static/chunks/6196-31414452fbd3c249.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"2375\",\"static/chunks/2375-03786e6c7f622660.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"4917\",\"static/chunks/4917-7ecccfd2f9bd8974.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"1867\",\"static/chunks/1867-5af547094c24f5af.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"6676\",\"static/chunks/app/(embed)/widget/embed/page-a0bd939f88d76102.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\"],\"default\"]\nc:I[23827,[],\"MetadataBoundary\"]\ne:I[23827,[],\"OutletBound"])</script><script>self.__next_f.push([1,"ary\"]\n11:I[28521,[],\"AsyncMetadataOutlet\"]\n13:I[23827,[],\"ViewportBoundary\"]\n15:I[46003,[\"4219\",\"static/chunks/app/global-error-f35a5d2ff7bf9e95.js?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\"],\"default\"]\n:HL[\"/_next/static/css/31e1255d9421281a.css?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"style\"]\n:HL[\"/_next/static/css/df328381cf84596e.css?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"style\"]\n"])</script><script>self.__next_f.push([1,"0:{\"P\":null,\"b\":\"D3jRZPfGDqRV24mWsY4VB\",\"p\":\"\",\"c\":[\"\",\"widget\",\"embed\"],\"i\":false,\"f\":[[[\"\",{\"children\":[\"(embed)\",{\"children\":[\"widget\",{\"children\":[\"embed\",{\"children\":[\"__PAGE__\",{}]}]}]}]},\"$undefined\",\"$undefined\",true],[\"\",[\"$\",\"$1\",\"c\",{\"children\":[[[\"$\",\"link\",\"0\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/31e1255d9421281a.css?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"precedence\":\"next\",\"crossOrigin\":\"$undefined\",\"nonce\":\"$undefined\"}]],[\"$\",\"html\",null,{\"lang\":\"en\",\"suppressHydrationWarning\":true,\"className\":\"h-full\",\"data-sentry-component\":\"RootLayout\",\"data-sentry-source-file\":\"layout.tsx\",\"children\":[\"$\",\"body\",null,{\"className\":\"h-full antialiased text-foreground bg-background\",\"suppressHydrationWarning\":true,\"children\":[[\"$\",\"$L2\",null,{\"attribute\":\"class\",\"defaultTheme\":\"system\",\"enableSystem\":true,\"data-sentry-element\":\"ThemeProvider\",\"data-sentry-source-file\":\"layout.tsx\",\"children\":[\"$\",\"$L3\",null,{\"parallelRouterKey\":\"children\",\"error\":\"$undefined\",\"errorStyles\":\"$undefined\",\"errorScripts\":\"$undefined\",\"template\":[\"$\",\"$L4\",null,{}],\"templateStyles\":\"$undefined\",\"templateScripts\":\"$undefined\",\"notFound\":[[\"$\",\"$L5\",null,{}],[]],\"forbidden\":\"$undefined\",\"unauthorized\":\"$undefined\"}]}],[\"$\",\"$L6\",null,{\"data-sentry-element\":\"Analytics\",\"data-sentry-source-file\":\"layout.tsx\"}]]}]}]]}],{\"children\":[\"(embed)\",[\"$\",\"$1\",\"c\",{\"children\":[null,[\"$\",\"$L3\",null,{\"parallelRouterKey\":\"children\",\"error\":\"$undefined\",\"errorStyles\":\"$undefined\",\"errorScripts\":\"$undefined\",\"template\":[\"$\",\"$L4\",null,{}],\"templateStyles\":\"$undefined\",\"templateScripts\":\"$undefined\",\"notFound\":\"$undefined\",\"forbidden\":\"$undefined\",\"unauthorized\":\"$undefined\"}]]}],{\"children\":[\"widget\",[\"$\",\"$1\",\"c\",{\"children\":[null,[\"$\",\"html\",null,{\"lang\":\"en\",\"suppressHydrationWarning\":true,\"className\":\"h-full\",\"data-sentry-component\":\"RootLayout\",\"data-sentry-source-file\":\"layout.tsx\",\"children\":[\"$\",\"body\",null,{\"className\":\"h-full overflow-y-hidden antialiased text-foreground bg-background font-regular\",\"suppressHydrationWarning\":true,\"children\":[[\"$\",\"$L7\",null,{\"data-sentry-element\":\"NuqsAdapter\",\"data-sentry-source-file\":\"layout.tsx\",\"children\":[\"$\",\"$L3\",null,{\"parallelRouterKey\":\"children\",\"error\":\"$undefined\",\"errorStyles\":\"$undefined\",\"errorScripts\":\"$undefined\",\"template\":[\"$\",\"$L4\",null,{}],\"templateStyles\":\"$undefined\",\"templateScripts\":\"$undefined\",\"notFound\":\"$undefined\",\"forbidden\":\"$undefined\",\"unauthorized\":\"$undefined\"}]}],[\"$\",\"$L6\",null,{\"data-sentry-element\":\"Analytics\",\"data-sentry-source-file\":\"layout.tsx\"}]]}]}]]}],{\"children\":[\"embed\",[\"$\",\"$1\",\"c\",{\"children\":[[[\"$\",\"link\",\"0\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/df328381cf84596e.css?dpl=dpl_4a7rFDYsWL85LFZoxjN7vgLg9M7H\",\"precedence\":\"next\",\"crossOrigin\":\"$undefined\",\"nonce\":\"$undefined\"}]],[\"$\",\"main\",null,{\"className\":\"light\",\"data-sentry-component\":\"EmbedLayout\",\"data-sentry-source-file\":\"layout.tsx\",\"children\":[\"$\",\"$L3\",null,{\"parallelRouterKey\":\"children\",\"error\":\"$undefined\",\"errorStyles\":\"$undefined\",\"errorScripts\":\"$undefined\",\"template\":[\"$\",\"$L4\",null,{}],\"templateStyles\":\"$undefined\",\"templateScripts\":\"$undefined\",\"notFound\":\"$undefined\",\"forbidden\":\"$undefined\",\"unauthorized\":\"$undefined\"}]}]]}],{\"children\":[\"__PAGE__\",[\"$\",\"$1\",\"c\",{\"children\":[[\"$\",\"$L8\",null,{\"Component\":\"$9\",\"searchParams\":{},\"params\":{},\"promises\":[\"$@a\",\"$@b\"]}],[\"$\",\"$Lc\",null,{\"children\":\"$Ld\"}],null,[\"$\",\"$Le\",null,{\"children\":[\"$Lf\",\"$L10\",[\"$\",\"$L11\",null,{\"promise\":\"$@12\"}]]}]]}],{},null,false]},null,false]},null,false]},null,false]},null,false],[\"$\",\"$1\",\"h\",{\"children\":[null,[\"$\",\"$1\",\"SJh37SUj0HVIlxJKg_SSF\",{\"children\":[[\"$\",\"$L13\",null,{\"children\":\"$L14\"}],null]}],null]}],false]],\"m\":\"$undefined\",\"G\":[\"$15\",[]],\"s\":false,\"S\":true}\n"])</script><script>self.__next_f.push([1,"16:\"$Sreact.suspense\"\n17:I[28521,[],\"AsyncMetadata\"]\na:{}\nb:{}\nd:[\"$\",\"$16\",null,{\"fallback\":null,\"children\":[\"$\",\"$L17\",null,{\"promise\":\"$@18\"}]}]\n"])</script><script>self.__next_f.push([1,"10:null\n"])</script><script>self.__next_f.push([1,"14:[[\"$\",\"meta\",\"0\",{\"charSet\":\"utf-8\"}],[\"$\",\"meta\",\"1\",{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"}]]\nf:null\n"])</script><script>self.__next_f.push([1,"18:{\"metadata\":[[\"$\",\"title\",\"0\",{\"children\":\"Helper Widget\"}],[\"$\",\"meta\",\"1\",{\"name\":\"description\",\"content\":\"Powered by Helper\"}],[\"$\",\"link\",\"2\",{\"rel\":\"manifest\",\"href\":\"/app.webmanifest\",\"crossOrigin\":\"$undefined\"}],[\"$\",\"link\",\"3\",{\"rel\":\"icon\",\"href\":\"/favicon.ico\",\"type\":\"image/x-icon\"}]],\"error\":null,\"digest\":\"$undefined\"}\n12:{\"metadata\":\"$18:metadata\",\"error\":null,\"digest\":\"$undefined\"}\n"])</script><next-route-announcer style="position: absolute;"></next-route-announcer></body></html>







"use client";

import React, { useState } from "react";

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "hi",
      isUser: true,
      timestamp: new Date()
    },
    {
      id: 2,
      content: "Hello! How can I help you with your Gumroad account or products today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const handleSubmit = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        content: message,
        isUser: true,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="light flex h-screen w-full flex-col responsive-chat max-w-full sm:max-w-[520px] bg-gumroad-bg fixed bottom-20 right-6 z-50 bg-white border border-black shadow-lg rounded-lg overflow-hidden" style={{ height: '600px' }}>
          {/* Header */}
          <div className="flex items-start justify-between border-b border-black p-1.5">
            <div className="flex items-center h-full">
              <div className="ml-2 flex flex-col gap-0.5">
                <h2 className="text-base leading-5 text-foreground font-semibold">Support</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted" 
                aria-label="Start new conversation"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor"></rect>
                  <path d="M8 12H16M12 8V16" strokeWidth="2" strokeLinecap="round" style={{ stroke: 'var(--background, white)' }}></path>
                </svg>
              </button>
              <button 
                className="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted" 
                aria-label="Show previous conversations"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history h-5 w-5" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                  <path d="M12 7v5l4 2"></path>
                </svg>
              </button>
              <button 
                className="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted" 
                aria-label="Minimize widget"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minimize2 lucide-minimize-2 h-5 w-5" aria-hidden="true">
                  <polyline points="4 14 10 14 10 20"></polyline>
                  <polyline points="20 10 14 10 14 4"></polyline>
                  <line x1="14" x2="21" y1="10" y2="3"></line>
                  <line x1="3" x2="10" y1="21" y2="14"></line>
                </svg>
              </button>
              <button 
                className="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted" 
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-5 w-5" aria-hidden="true">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container - Simplified Structure */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-color-rgba scrollbar-webkit" id="message-container">
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col gap-2 ${msg.isUser ? 'ml-9 items-end' : 'mr-9 items-start'}`}>
                  <div className={`rounded-lg max-w-full ${msg.isUser ? 'bg-primary text-primary-foreground' : 'border border-black bg-background text-foreground'}`}>
                    <div className="relative p-4">
                      <div className={`prose prose-sm max-w-none text-sm ${msg.isUser ? 'text-primary-foreground **:text-primary-foreground' : 'text-foreground **:text-foreground'}`}>
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400" title={msg.timestamp.toLocaleString()}>
                      <span title={msg.timestamp.toLocaleString()}>now</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Buttons */}
          <div className="flex justify-center gap-4 py-3 border-t border-gray-200" style={{ opacity: 1, transform: 'none' }}>
            <button className="flex items-center gap-2 rounded-full border border-gray-400 text-black px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">
              <div className="w-4 h-4 origin-bottom-left" style={{ transform: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up h-4 w-4" aria-hidden="true">
                  <path d="M7 10v12"></path>
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
                </svg>
              </div>
              That solved it!
            </button>
            <button className="flex items-center gap-2 rounded-full border border-gray-400 text-black px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">
              <div className="w-4 h-4 origin-center" style={{ transform: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-down h-4 w-4" aria-hidden="true">
                  <path d="M17 14V2"></path>
                  <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"></path>
                </svg>
              </div>
              This didn't help
            </button>
          </div>

          {/* Chat Input */}
          <div className="border-t border-black p-4 bg-white">
            <form className="flex flex-col gap-2">
              <div className="flex-1 flex items-start">
                <textarea
                  className="w-full rounded-lg border-border text-sm focus:border-transparent focus:ring-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 self-stretch max-w-md placeholder:text-muted-foreground text-foreground flex-1 resize-none border-none bg-white p-0 pr-3 outline-hidden focus:border-none focus:outline-hidden focus:ring-0 min-h-[24px] max-h-[200px]"
                  aria-label="Ask a question"
                  placeholder="Ask a question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ height: '40px' }}
                />
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    className="text-primary hover:text-muted-foreground p-2 rounded-full hover:bg-muted" 
                    aria-label="Dictate"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic w-4 h-4 text-primary" aria-hidden="true">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  </button>
                  <div className="relative">
                    <button 
                      type="submit"
                      onClick={handleSubmit} 
                      aria-label="Send message" 
                      className="relative z-10 flex h-8 w-8 items-center justify-center rounded-md bg-primary text-2xl text-primary-foreground transition-all duration-300 ease-in-out hover:border hover:border-black hover:bg-[#FF90E7] hover:text-black"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send h-3.5 w-3.5 -rotate-90" aria-hidden="true">
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                        <path d="m21.854 2.147-10.94 10.939"></path>
                      </svg>
                    </button>
                    <div className="absolute left-0 top-0 h-8 w-8 rounded-md bg-black transition-all duration-300 ease-in-out"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="p-3 rounded-full shadow-lg"
          style={{ backgroundColor: "#FB64B6" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle support chat"
        >
          <svg
            className="hand-icon"
            width="26"
            height="29"
            viewBox="0 0 26 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9885 19.1603C14.4462 16.4526 25.36 8.80865 25.36 8.80865L22.5717 4.78239C22.5717 4.78239 18.2979 8.46521 15.1353 12.7541C14.4648 13.7215 13.1488 12.9234 13.9447 11.5515C15.9064 8.16995 21.5892 2.70127 21.5892 2.70127L17.2712 0.54569C17.2712 0.54569 14.458 3.38303 10.9133 10.5004C10.2651 11.8018 8.94659 11.1429 9.39493 9.80167C10.5422 6.36947 14.2637 0.913031 14.2637 0.913031L9.74091 0.17627C9.74091 0.17627 7.30141 4.59585 5.78539 10.0891C5.46118 11.2634 4.04931 10.9838 4.2171 9.81717C4.50759 7.79708 6.51921 1.95354 6.51921 1.95354L2.60762 1.97033C2.60762 1.97033 -0.737277 9.78607 1.7329 18.4073C3.13956 23.3167 7.54191 28.1763 13.287 28.1763C18.9209 28.1763 23.8513 23.8362 25.5294 17.1416L21.6221 14.1778C21.6221 14.1778 19.4441 21.7758 16.9885 19.1603Z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .light, :root {
          --sidebar-width-icon: 3rem;
          --destructive: #c03f0c;
          --destructive-foreground: #fff;
          --success: #157f3c;
          --success-foreground: #fff;
          --chart-1: #e76e50;
          --chart-2: #2a9d90;
          --chart-3: #274754;
          --chart-4: #e8c468;
          --chart-5: #f4a462;
          --radius: .5rem;
          --syntax-plain: #24292e;
          --syntax-comment: #6a737d;
          --syntax-keyword: #d73a49;
          --syntax-function: #6f42c1;
          --syntax-string: #032f62;
          --syntax-number: #005cc5;
          --chart-open: #4c0c0b;
          --chart-closed-manual: #fec51b;
          --chart-closed-ai: #b4d04e;
          --chart-negative: #c03f0c;
        }
        
        .scrollbar-color-rgba {
          scrollbar-color: rgba(0, 0, 0, 0.4) transparent;
        }
        .scrollbar-webkit::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }
        .scrollbar-webkit::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 2px;
        }
        .bg-primary {
          background-color: #FB64B6;
        }
        .text-primary {
          color: #FB64B6;
        }
        .text-primary-foreground {
          color: white;
        }
        .text-foreground {
          color: black;
        }
        .bg-background {
          background-color: white;
        }
        .hover\\:bg-muted:hover {
          background-color: #f5f5f5;
        }
        .hover\\:text-muted-foreground:hover {
          color: #666;
        }
        .focus\\:border-primary:focus {
          border-color: #FB64B6;
        }
        .focus\\:ring-primary:focus {
          --tw-ring-color: #FB64B6;
        }
        .border-border {
          border-color: transparent;
        }
        .focus\\:border-transparent:focus {
          border-color: transparent;
        }
        .focus\\:ring-muted-foreground:focus {
          --tw-ring-color: #666;
        }
        .outline-hidden {
          outline: none !important;
        }
        .focus\\:outline-hidden:focus {
          outline: none !important;
        }
        .focus\\:ring-0:focus {
          box-shadow: none !important;
        }
        .placeholder\\:text-muted-foreground::placeholder {
          color: #666;
        }
      `}</style>
    </>
  );
};

export default SupportWidget;



add exact style and strucute in this compoentn