import createApp from './create-app';

export default context => {                 // context为server-render的context
    return new Promise(( resolve, reject) => {
        const { app, router } = createApp();
        
        router.push(context.url);
        
        console.log(context.url, 'router')

        router.onReady(() => {
            // const matchedComponent = router.getMatchedComponents();
            // if (!matchedComponent.length) return reject(new Error('no component matchd'));
            resolve(app);
        })
    })

}