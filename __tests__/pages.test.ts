import { describe, test, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import Home from '../src/views/Home.vue';
import Library from '../src/views/Library.vue';
import NotFound from '../src/views/NotFound.vue';
import Schedule from '../src/views/Schedule.vue';

vi.mock('@/libraries/useAudioPlayer', () => ({
  useAudioPlayer: () => ({
    init: vi.fn(),
    playSound: vi.fn().mockResolvedValue(undefined),
    stopSound: vi.fn().mockResolvedValue(undefined),
    sleep: vi.fn().mockResolvedValue(undefined)
  })
}));

vi.mock('@/assets/year/2022/winter/2022-winter_gozoku.mp4', () => ({
  default: 'mock-video.mp4'
}));

vi.mock('@/assets/year/2026/spring/archive-gozoku-home.webp', () => ({
  default: 'mock-home.webp'
}));

vi.mock('@/assets/year/2026/spring/archive-gozoku-library.webp', () => ({
  default: 'mock-library.webp'
}));

vi.mock('@/assets/year/2026/spring/archive-gozoku-schedule.webp', () => ({
  default: 'mock-schedule.webp'
}));

vi.mock('@/libraries/leaflet.ts', () => ({
  LMap: { template: '<div class="l-map"><slot /></div>' },
  LMarker: { template: '<div class="l-marker"><slot /></div>', props: ['latLng'] },
  LPopup: { template: '<div class="l-popup"><slot /></div>', props: ['options'] },
  LTileLayer: { template: '<div class="l-tile-layer" />', props: ['url', 'layerType', 'name'] }
}));

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/schedule', component: { template: '<div />' } },
      { path: '/library', component: { template: '<div />' } }
    ]
  });
}

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders hero section with title', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Home, {
      global: { plugins: [router] }
    });

    expect(wrapper.find('.hero').exists()).toBe(true);
    expect(wrapper.find('.hero-title').text()).toContain('豪族会');
    expect(wrapper.find('.hero-eyebrow').text()).toContain('茨城');
    expect(wrapper.find('.hero-desc').text()).toContain('豪族の名の下');
  });

  test('renders CTA button', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Home, {
      global: { plugins: [router] }
    });

    const btn = wrapper.find('.btn-clan');
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toBe('開催履歴を見る');
  });

  test('renders all members', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Home, {
      global: { plugins: [router] }
    });

    const memberRows = wrapper.findAll('.member-row');
    expect(memberRows.length).toBe(4);

    expect(wrapper.text()).toContain('Y.H');
    expect(wrapper.text()).toContain('筆頭豪族');
    expect(wrapper.text()).toContain('H.I');
    expect(wrapper.text()).toContain('パチモンのやんす');
    expect(wrapper.text()).toContain('T.O');
    expect(wrapper.text()).toContain('やんすの偽物');
    expect(wrapper.text()).toContain('K.K');
    expect(wrapper.text()).toContain('元祖 やんす');
  });

  test('first member has main rank class', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Home, {
      global: { plugins: [router] }
    });

    const firstRank = wrapper.find('.member-rank');
    expect(firstRank.classes()).toContain('main');
  });

  test('renders member numbers', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Home, {
      global: { plugins: [router] }
    });

    expect(wrapper.text()).toContain('01');
    expect(wrapper.text()).toContain('02');
    expect(wrapper.text()).toContain('03');
    expect(wrapper.text()).toContain('04');
  });
});

describe('NotFound', () => {
  test('renders 404 page header', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(NotFound, {
      global: { plugins: [router] }
    });

    expect(wrapper.find('#page-not-found').exists()).toBe(true);
    expect(wrapper.text()).toContain('Not found');
    expect(wrapper.text()).toContain('存在しないページ');
    expect(wrapper.text()).toContain('このページは存在しません');
  });
});

describe('Schedule', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders page header', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Schedule, {
      global: { plugins: [router] }
    });

    expect(wrapper.find('#page-schedule').exists()).toBe(true);
    expect(wrapper.text()).toContain('Event History');
    expect(wrapper.text()).toContain('開催履歴');
  });

  test('renders all event cards', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Schedule, {
      global: { plugins: [router] }
    });

    const eventCards = wrapper.findAll('.event-card');
    expect(eventCards.length).toBe(19);
  });

  test('renders event details correctly', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Schedule, {
      global: { plugins: [router] }
    });

    expect(wrapper.text()).toContain('2026 — 04 — 04');
    expect(wrapper.text()).toContain('K.K の Celebrate Party');
    expect(wrapper.text()).toContain('チャペル&ウェディングレストラン バウム');
  });

  test('renders online events with special class', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Schedule, {
      global: { plugins: [router] }
    });

    const onlinePlaces = wrapper.findAll('.event-place.online');
    expect(onlinePlaces.length).toBeGreaterThan(0);
  });

  test('renders unknown places with special class', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Schedule, {
      global: { plugins: [router] }
    });

    const unknownPlaces = wrapper.findAll('.event-place.unknown');
    expect(unknownPlaces.length).toBeGreaterThan(0);
  });

  test('renders map section', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Schedule, {
      global: { plugins: [router] }
    });

    expect(wrapper.find('.map-placeholder').exists()).toBe(true);
  });
});

describe('Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders page header', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Library, {
      global: { plugins: [router] }
    });

    expect(wrapper.find('#page-library').exists()).toBe(true);
    expect(wrapper.text()).toContain('Legacy Archive');
    expect(wrapper.text()).toContain('遺産');
  });

  test('renders intro text', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Library, {
      global: { plugins: [router] }
    });

    expect(wrapper.text()).toContain('ここに眠るのは、豪族会の古き良き時代');
  });

  test('renders all legacy items', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Library, {
      global: { plugins: [router] }
    });

    const legacyItems = wrapper.findAll('.legacy-item');
    expect(legacyItems.length).toBe(4);
  });

  test('renders legacy item details', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Library, {
      global: { plugins: [router] }
    });

    expect(wrapper.text()).toContain('Celebrate KK');
    expect(wrapper.text()).toContain('古の豪族会サイト');
    expect(wrapper.text()).toContain('豪族会 — 冬の記録');
    expect(wrapper.text()).toContain('豪族会 — 夏の記録');
  });

  test('renders link type items', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Library, {
      global: { plugins: [router] }
    });

    const links = wrapper.findAll('.legacy-link');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].attributes('href')).toBe('https://aecomet.github.io/celebrate-kk/');
  });

  test('renders video type items', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Library, {
      global: { plugins: [router] }
    });

    const videos = wrapper.findAll('video');
    expect(videos.length).toBe(1);
  });

  test('renders image type items', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Library, {
      global: { plugins: [router] }
    });

    const images = wrapper.findAll('.legacy-image');
    expect(images.length).toBe(3);
  });

  test('renders music button', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(Library, {
      global: { plugins: [router] }
    });

    const musicBtn = wrapper.find('.legacy-btn');
    expect(musicBtn.exists()).toBe(true);
    expect(musicBtn.text()).toBe('記録を開く');
  });
});
