(async function() { 
  'use strict'; 

  function startPlugin() {

  const head = {
    'head_filter_show_search': {name: 'Поиск', element: '.open--search'}, 
    'head_filter_show_premium': {name: 'Премиум', element: '.open--premium'}, 
    'head_filter_show_profile': {name: 'Профиль', element: '.open--profile'}, 
    'head_filter_show_feed': {name: 'Новости', element: '.open--feed'}, 
    'head_filter_show_notice': {name: 'Уведомления', element: '.open--notice'},
    'head_filter_show_fullscreen': {name: 'Полноэкранный режим', element: '.full-screen'}, 
    'head_filter_show_split': {name: 'Разделитель', element: '.head__split'}, 
    'head_filter_show_time': {name: 'Время', element: '.head__time'}, 
  };
  

  function showHideElement(element, show) {
    if (show == true) {
      $(element).show()
    } else {
      $(element).hide()
    }
  }

  Lampa.Storage.listener.follow('change', function (event) {
    console.log(event.name);
      if (event.name == 'activity') { // если приложение только запущено (activity)
        Object.keys(head).forEach(key => {
          var show_element = Lampa.Storage.get(key, true); 
          showHideElement(head[key].element, show_element);     
        });
      } else if (event.name in head) { // если изменен наш параметр
        var show_element = Lampa.Storage.get(event.name, true); 
        showHideElement(head[event.name].element, show_element);     
      }      
    });


  Lampa.SettingsApi.addComponent({
    component: 'head_filter',
    name: 'Шапка',
    icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3879 3.25H13.6121C14.6973 3.24998 15.5784 3.24997 16.2872 3.33473C17.0262 3.4231 17.6608 3.6112 18.2155 4.04423C18.7701 4.47727 19.1065 5.04733 19.3715 5.74284C19.6256 6.40994 19.8393 7.26472 20.1025 8.31749L20.5856 10.25H22C22.4142 10.25 22.75 10.5858 22.75 11C22.75 11.4142 22.4142 11.75 22 11.75H20.0157C20.0048 11.7502 19.994 11.7502 19.9832 11.75H4.01681C4.00601 11.7502 3.99518 11.7502 3.98432 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H3.41442L3.89754 8.31749C4.16072 7.26472 4.3744 6.40994 4.62854 5.74284C4.89351 5.04733 5.22991 4.47727 5.78453 4.04423C6.33916 3.6112 6.97379 3.4231 7.7128 3.33473C8.42162 3.24997 9.3027 3.24998 10.3879 3.25ZM4.96058 10.25H19.0394L18.6586 8.72669C18.3813 7.61763 18.1882 6.85038 17.9697 6.27686C17.7584 5.72218 17.5515 5.42889 17.2923 5.22654C17.0332 5.02419 16.6985 4.89459 16.1091 4.82412C15.4997 4.75125 14.7085 4.75 13.5653 4.75H10.4347C9.29147 4.75 8.50029 4.75125 7.8909 4.82412C7.30154 4.89459 6.96681 5.02419 6.70765 5.22654C6.44849 5.42889 6.24158 5.72218 6.03027 6.27686C5.81177 6.85038 5.61867 7.61763 5.34141 8.72669L4.96058 10.25ZM6.5 14.75C4.98122 14.75 3.75 15.9812 3.75 17.5C3.75 19.0188 4.98122 20.25 6.5 20.25C8.01878 20.25 9.25 19.0188 9.25 17.5C9.25 15.9812 8.01878 14.75 6.5 14.75ZM2.25 17.5C2.25 15.1528 4.15279 13.25 6.5 13.25C8.45789 13.25 10.1066 14.5739 10.5996 16.3754C11.4979 16.0137 12.5021 16.0137 13.4004 16.3754C13.8934 14.5739 15.5421 13.25 17.5 13.25C19.8472 13.25 21.75 15.1528 21.75 17.5C21.75 19.8472 19.8472 21.75 17.5 21.75C15.314 21.75 13.5134 20.0995 13.2764 17.9767L13.0062 17.8416C12.3728 17.5249 11.6272 17.5249 10.9938 17.8416L10.7236 17.9767C10.4866 20.0995 8.68604 21.75 6.5 21.75C4.15279 21.75 2.25 19.8472 2.25 17.5ZM17.5 14.75C15.9812 14.75 14.75 15.9812 14.75 17.5C14.75 19.0188 15.9812 20.25 17.5 20.25C19.0188 20.25 20.25 19.0188 20.25 17.5C20.25 15.9812 19.0188 14.75 17.5 14.75Z" fill="currentcolor"></path> </g></svg>'
  });


  Lampa.SettingsApi.addParam({
    component: 'head_filter',
    param: {
      type: 'title'
    },
    field: {
      name: 'Отображать',
    }
  })


    Object.keys(head).forEach(key => {
      Lampa.SettingsApi.addParam({
        component: 'head_filter',
        param: {
          name: key,
          type: 'trigger',
          default: true
        },
        field: {
          name: head[key].name,
        }        
      });
    });

  }

  if (window.appready) startPlugin();
  else {
    Lampa.Listener.follow('app', function(e) {
      if(e.type == 'ready') {
        startPlugin();
      }
    });
  }

})(); 