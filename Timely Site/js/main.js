$(document).ready(function(){



//---------------------------- CHECK LOGIN------------------------------------------------


    var checkLogin = function(){
        $.ajax({
            url:'xhr/check_login.php',
            type: 'get',
            dataType: 'json',
            success: function(r){
                if(r.user){
                    loadApp();
                }else{
                    init();
                }
            }
        });
    };


//----------------------------LOGIN------------------------------------------------

    function login(){
        var username = $('#user').val();
        var password = $('#pass').val();

        $.ajax({
            url: 'xhr/login.php',
            data:{
                username: username,
                password: password
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.user){
                    loadApp();
                }else{
//                    loadApp();
                }
            }
        })
    }


//----------------------------GET PROJECTS------------------------------------------------

    var getProjects = function(){


        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
               console.log(this);
                $.get('templates/project.html', function(htmlArg){
                    var project = $(htmlArg).find('#project-template').html();
                    $.template('projecttemp', project);
                    var html = $.render(response.projects, 'projecttemp');
                    $('#project-wrapper').append(html);

                    var projectName = $('.project-div').find('.project-name');
                    var addTaskButton = $('.add-task');

//                    var projectStatus = $('.project-status').html();
//
//                    var projectID = $('.pID').html();
//
//                    var pStatus = function(){
//                        if(projectID.parent().find('.project-div').find('.project-status').html() === 'active'){
//                            projectID.parent().addClass('active');
//                        }else if(projectID.parent().find('.project-div').find('.project-status').html() === 'delayed'){
//                            projectID.parent().addClass('delayed');
//                        }
//                    };
//
//                    pStatus();

                    // loads tasks on click of project name
                    projectName.on('click', function(e){
                        var id = $(this).parent().parent().find('.pID').html();
                        var pName = $(this).html();
                        var pDesc = $(this).parent().parent().find('#description').html();
                        loadTasks(id, pName, pDesc);

                        return false;

                    });
                })
            }
        });
    };


//----------------------------GET TASKS------------------------------------------------

var getTasks = function(id){

    $.ajax({
        url: 'xhr/get_tasks.php',
        type: 'get',
        data:{
            projectID: id
        },
        dataType: 'json',
        success: function(response){
            console.log(this);
            $.get('templates/load-tasks.html', function(htmlArg){
                var tasks = $(htmlArg).find('#load-tasks').html();
                $.template('taskstemp', tasks);
                var html = $.render(response.tasks, 'taskstemp');
                $('#task-wrapper').append(html);


            })
        }
    });
};



//----------------------------CREATE PROJECT------------------------------------------------

    var newProject = function(){

        var projectName = $('#project-name').val();
        var description = $('#description').val();
        var status = $("input[name='priority']:checked").val();

        $.ajax({
            url: 'xhr/new_project.php',
            data:{
                projectName: projectName,
                projectDescription: description,
                status: status
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.newproject){
                    loadApp();
                }else{
//                  loadApp();
                }
            }
        })
    };


//----------------------------CREATE TASK------------------------------------------------

    var newTask = function(id){

        var taskName = $('#task-name').val();
        var taskDescription = $('#task-description').val();
        var taskStatus = $("input[name='task-status']:checked").val();

        $.ajax({
            url: 'xhr/new_task.php',
            data:{
                projectID: id,
                taskName: taskName,
                taskDescription: taskDescription,
                status: taskStatus
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.task){
                    loadTasks();
                }else{
                    console.log('error');
                }
            }
        })
    };




//----------------------------SIGN UP------------------------------------------------

  function sign(){
      var username = $('#username').val();
      var email = $('#email').val();
      var password = $('#password').val();

      console.log(username);

      $.ajax({
          url: 'xhr/register.php',
          data:{
              username: username,
              password: password,
              email: email
          },
          type: 'post',
          dataType: 'json',
          success: function(response){
              if(response.user){
                  loadApp();
              }else{
//                  loadApp();
              }
          }
      })
  }



//----------------------------load home page------------------------------------------------


   var init = function(){
       $('#landing-wrapper').empty();
       $.get('templates/landing.html', function(htmlArg){
           var landing = $(htmlArg).find('#landing-template').html();
           $.template('landingtemplate', landing);
           var html = $.render('', 'landingtemplate');
           $('#landing-wrapper').append(html);


           var signUp = $('#sign-up-button');
           var cancel = $('#cancel-pic');

           signUp.next().css({
               opacity: 0
           });

           signUp.on('click', function(e){
               $(this).next().animate({
                   top: '80px',
                   opacity: 1
               });
               $(this).next().show();
           });

           cancel.on('click', function(e){
               $(signUp).next().css({
                   top: '-100px',
                   display: 'none',
                   opacity: 0
               });
           });

           //login button--------------
           var loginButton = $('#login');
           loginButton.on('click', function(e){
               login();
               return false;
           });

           //sign-up button--------------
           var signupButton = $('#submit-sign-up');
           signupButton.on('click', function(e){
               sign();
               return false;
           });
       })
   };


   checkLogin();



//--------------------------------load app------------------------------------------------


    var loadApp = function(){
        $('#landing-wrapper').empty();
        $.get('templates/app.html', function(htmlArg){
            var app = $(htmlArg).find('#app-template').html();
            $.template('apptemplate', app);
            var html = $.render('', 'apptemplate');

            $('#landing-wrapper').append(html);

            getProjects();

            $('.project-wrapper').sortable();

            var projectButton = $('#new-project-button');
            var newProjectBox = $('#create-project');
            var myAccountButton = $('#my-account-button');
            var accountInfo = $('#my-account');
            var sortable = $('.sortable');
            var accordion = $( ".accordion" );

            //makes projects sortable
            sortable.sortable();
            sortable.disableSelection();

            accordion.accordion({
                collapsible: true,
                heightStyle: "content"
            });


            myAccountButton.on('click', function(e){
                accountInfo.animate({
                    top: '80px',
                    opacity: 1
                });
                accountInfo.show();
            });

            $('#cancel-account-pic').on('click', function(e){
                accountInfo.animate({
                    top: '-100px',
                    opacity: 0
                });

                accountInfo.hide();
            });


            newProjectBox.css({
                opacity: 0
            });
            // shows create a project box
            projectButton.on('click', function(e){
                newProjectBox.animate({
                    top: '80px',
                    opacity: 1
                });
                newProjectBox.show();

            });
            //cancels the create a project box
            $('#cancel-pic').on('click', function(e){
                newProjectBox.css({
                    top: '800px',
                    display: 'none',
                    opacity: 0
                });

            });

            var submit = $('#submit-create-project');
            //creates new project
            submit.on('click', function(e){
                newProject();
                return false;
            });


            $('#logout').on('click', function(){
                $.get('xhr/logout.php', function(){
                    init();
                    return false;
                });
            });



        });
    };



//--------------------------------load tasks------------------------------------------------



    var loadTasks = function(id, pName, pDesc){
        $('#landing-wrapper').empty();
        $.get('templates/tasks.html', function(htmlArg){
            var tasks = $(htmlArg).find('#task-template').html();
            $.template('tasktemplate', tasks);
            var html = $.render('', 'tasktemplate');
            $('#landing-wrapper').append(html);

            $('#pName').append(pName);
            $('.project-description').find('p').append(pDesc);

            var taskButton = $('#new-task-button');
            var createTask = $('#create-project');
            var submit = $('#submit');

            createTask.css({
                opacity: 0
            });

            taskButton.on('click', function(e){
                createTask.animate({
                    top: '80px',
                    opacity: 1
                });

                createTask.show();
            });

            $('#cancel-pic').on('click', function(e){
                createTask.css({
                    top: '800px',
                    display: 'none',
                    opacity: 0
                });

            });

            submit.on('click', function(e){
                createTask.css({
                    top: '800px',
                    display: 'none',
                    opacity: 0
                });
            });

            var projectBack = $('#back-to-projects');

            projectBack.on('click', function(e){
                loadApp();
            });


            var submitTask = $('#submit-task');

            submitTask.on('click', function(e){
                newTask(id);
                return false;
            });

            getTasks(id);

        })

    };



});


