
'use strict';

const express      = require('express');
const shuffleArray = require('shuffle-array');

const router = express.Router();

const party = [
	'이혁제',
	'이정훈',
	'장성수',
	'채두원',
	'원진',
	'이세인',
	'박현준',
	'김수완'
];

let map = null;

router.get('/party', (req, res) => {
	res.status(200).json({
		party: party
	});
});
router.all('/party', (req, res) => res.status(405).end());

router.post('/party/shuffle', (req, res) => {
	if (party.length < 2) {
		res.status(200).json({
			ok   : false,
			error: '참가자가 너무 적습니다.'
		});
		return;
	}

	let presenterSet = {};
	    map          = {};

	for (let index = 0; index < party.length; ) {
		const presenter = shuffleArray.pick(party);

		if (presenterSet.hasOwnProperty(presenter) || presenter == party[index]) {
			if (presenter == party[index] && index == party.length - 1) {
				index        = 0;
				presenterSet = {};
				map          = {};
			}

			continue;
		}

		presenterSet[presenter]       = true;
		map          [party[index++]] = presenter;
	}

	res.status(200).end();
});
router.all('/party/shuffle', (req, res) => res.status(405).end());

router.get('/party/:name/presenter', (req, res) => {
	if (!(req.params.name = String(req.params.name).trim())) {
		res.status(400).end();
		return;
	}

	if (!party.includes(req.params.name)) {
		res.status(200).json({
			ok   : false,
			error: '없는 참가자입니다.'
		});
		return;
	}

	if (!map) {
		res.status(200).json({
			ok   : false,
			error: '셔플되지 않았습니다.'
		});
		return;
	}

	if (!map.hasOwnProperty(req.params.name)) {
		res.status(200).json({
			ok   : false,
			error: '없는 참가자입니다.'
		});
		return;
	}

	res.status(200).json({
		ok       : true,
		presenter: map[req.params.name]
	});
});
router.all('/party/:name/presenter', (req, res) => res.status(405).end());
router.all('/party/:nampresenter', (req, res) => res.status(405).end());

module.exports = router;