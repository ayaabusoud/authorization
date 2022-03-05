<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Email Verfication</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="../style.css" rel="stylesheet">
    </head>
    <body class="passBody">
        <div class="container4">
            <form action="/auth/resendEmail" method="POST" class="forgotPass-form">
                     <h2 class="title">Verify your email</h2>
                     <p>You're almost there! we have sent you an email </p>
                     <p>Just click on the link that we have sent to</p>
                     <p> go to our home page</p>
                     <p id="resend">if you don't see it, click here </p>
                     <input class="btn" type="submit" value="Resend email">
                     {{#if message }}
                     <h4 class="errorMsg">{{message}}</h4>
                     {{/if}
                      router.get('/resendEmail', (req, res) => {
    res.render('emailVerfication');
});}
                 </form> 
              </div>  
    </body>
</html>
