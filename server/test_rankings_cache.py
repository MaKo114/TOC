import unittest
from unittest.mock import Mock, patch

import controller


class RankingsCacheTests(unittest.TestCase):
    def setUp(self):
        controller._cache.clear()

    def tearDown(self):
        controller._cache.clear()

    def responses(self):
        return [
            Mock(text='<a href="/rankings">Rankings</a>'),
            Mock(text='<a href="/rankings/europe">Europe</a>'),
            Mock(text='''
                <div class="rank-item-rank-num">1</div>
                <a href="/team/2059/team-vitality">
                  <img src="//owcdn.net/img/vitality.png">
                  <div class="ge-text">Team Vitality
                    <span class="ge-text-light">#Y1ZA</span>
                    <div class="rank-item-team-country">Europe</div>
                  </div>
                </a>
                <div class="rank-item-rating">2000</div>
            '''),
        ]

    def test_rankings_refresh_after_five_minutes(self):
        with patch.object(controller.requests, 'get', side_effect=self.responses()) as get:
            with patch('time.monotonic', return_value=100):
                first = controller.get_europe_team_info()
            self.assertEqual(first[0]['name'], 'Team Vitality')
            first[0]['name'] = 'Old cached leader'
            get.side_effect = self.responses()
            with patch('time.monotonic', return_value=400):
                refreshed = controller.get_europe_team_info()
            self.assertEqual(refreshed[0]['name'], 'Team Vitality')
            self.assertEqual(get.call_count, 6)

    def test_rankings_reuse_cache_before_expiry(self):
        with patch.object(controller.requests, 'get', side_effect=self.responses()) as get:
            with patch('time.monotonic', return_value=100):
                first = controller.get_europe_team_info()
            with patch('time.monotonic', return_value=399):
                self.assertIs(controller.get_europe_team_info(), first)
            self.assertEqual(get.call_count, 3)


if __name__ == '__main__':
    unittest.main()
