const express = require('express');
const router = express.Router()
const Book = require('../models/book');

router.get('/', async (req, res) => {
	//v2: (mit search)
	let searchOptions = {}
	if (req.query.name){
		searchOptions.name = new RegExp(req.query.name,'i')
	}
	try {
		const books = await Book.find(searchOptions);
		res.render('books/index', { books: books, book: req.query });
	} catch {
		console.log('ERROR!', req.body)
		res.redirect('/');
	}

	//v1:
	// try {
	// 	const books = await book.find();
	// 	res.render('books/index', { books: books });
	// } catch {
	// 	console.log('ERROR!', req.body)
	// 	res.redirect('/');
	// }

	//v0:
	//res.render('books/index'); 
})
router.get('/new', (req, res) => {
	res.render('books/new', { book: new Book() });
})
router.post('/', async (req, res) => {
	const book = new Book({ name: req.body.name });

	//v2 (async):
	try {
		const o = await book.save();
		res.redirect('books'); //res.redirect(`books/${o.id}`); 
	} catch {
		console.log('ERROR!', req.body.name)
		res.render('books/new', { book: book, errorMessage: "error creating book!" })
	}

	//v1:
	// book.save((err, o) => {
	// 	if (err) {
	// 		res.render('books/new', { book: book, errorMessage: "error creating book!" })
	// 	} else {
	// 		res.redirect('books'); //res.redirect(`books/${o.id}`);  
	// 	}
	// })

	//v0:
	//res.send(req.body.name);
})

module.exports = router;










