from pathlib import Path
import unittest
from unittest.mock import Mock, patch

import controller


class MatchCardTests(unittest.TestCase):
    def setUp(self):
        controller._cache.clear()
        self.html = (Path(__file__).parent / 'tests/fixtures/meison_recent_matches.html').read_text(encoding='utf-8')

    def tearDown(self):
        controller._cache.clear()

    def extract(self, limit=5):
        with patch.object(controller, 'player_detail', return_value={'href': 'https://www.vlr.gg/player/8819/meison'}), \
             patch.object(controller.requests, 'get', return_value=Mock(text=self.html)):
            return controller.extract_match_cards('Barça eSports', 'meisoN', limit=limit)

    def test_recent_matches_exclude_map_statistics_before_limit(self):
        matches = self.extract()
        self.assertEqual(len(matches), 5)
        self.assertEqual([m['match_url'].split('/')[3] for m in matches],
                         ['159935', '159932', '157556', '152220', '157522'])
        self.assertEqual(matches[0]['event'], 'CT: Liga Radiante 22/23 S1')
        self.assertEqual(matches[0]['stage'], 'Playoffs ⋅ GF')
        for match in matches:
            with self.subTest(url=match['match_url']):
                self.assertNotIn('?game=', match['match_url'])
                self.assertNotEqual(match['event'], 'Unknown Event')
                self.assertNotEqual(match['stage'], 'Unknown Stage')
                self.assertTrue(match['team_1'])
                self.assertTrue(match['team_2'])
                self.assertTrue(match['score'])
                self.assertTrue(match['date'])

    def test_class_order_does_not_change_match_selection(self):
        self.html = self.html.replace('wf-card fc-flex m-item', 'm-item wf-card fc-flex')
        matches = self.extract(limit=2)
        self.assertEqual([m['match_url'].split('/')[3] for m in matches], ['159935', '159932'])


if __name__ == '__main__':
    unittest.main()
