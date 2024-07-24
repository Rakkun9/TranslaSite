

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('input[type="button"][value="Traducir"]');
    button.addEventListener('click', () => {
        const texto1 = document.getElementById('textarea1').value;
        console.log('Contenido del textarea 1:', texto1);
        
        // Aquí puedes agregar la lógica para enviar los datos al servidor o manipularlos según sea necesario
        
    });
});