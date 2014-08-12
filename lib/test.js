/**
 * Created by ciaosu on 2014/8/3.
 */
var mongoose = require('mongoose');
var model = require('./model');
var book = require('./book');


model.bookstore.find(function(err, bookstores){
    if (err){
        console.log(err);
    } else{
        var bookstore = bookstores[0];
        book.findBookOfBookstore2(bookstore._id, "-rating.numRaters", 10, function(err, books){
            if (err){
                console.log(err);
            } else {
                console.log(books);
                console.log(books.length);
            }
        })
    }
});

book.findBookOfArea2("53d667fd54e65c0eb8702581", "-rating.numRaters",function(err, books){
    console.log(books);
    console.log(books.length);
})


//book.findBookById("53d667fe54e65c0eb8702961", function(err, book){
//    console.log(book);
//});