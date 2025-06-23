import { CommunitySection } from '@pages/CommunitiesPage/component/list-communities';

export const mockCommunitiesList: CommunitySection[] = [
  {
    title: "Owned",
    communities: [
      {
        id: "1",
        name: "Smart Money Concept",
        avatar: "https://i.imgur.com/1bX5QH6.png",
        isPrivate: false,
        isSelected: true
      },
      {
        id: "2",
        name: "Neuroscientists & Musicque",
        avatar: "https://i.imgur.com/8Km9tLL.png",
        isPrivate: false
      },
      {
        id: "3",
        name: "Supportive Circles Alliance Lorem",
        avatar: "https://i.imgur.com/cecc0f0.png",
        isPrivate: true,
        isDisabled: true,
        status: "deactivated"
      }
    ]
  },
  {
    title: "Managed",
    communities: [
      {
        id: "4",
        name: "Operations Forecast",
        avatar: "https://i.imgur.com/9a1e924.png",
        isPrivate: true
      },
      {
        id: "5",
        name: "未分类",
        avatar: "https://i.imgur.com/8a3edb7.png",
        isPrivate: false,
        isDisabled: true,
        status: "deactivated"
      },
      {
        id: "6",
        name: "AstraCore Technologies",
        avatar: "https://i.imgur.com/351a40e.png",
        isPrivate: true
      },
      {
        id: "7",
        name: "UK - P",
        avatar: "https://i.imgur.com/c81c02f.png",
        isPrivate: false,
        isDisabled: true,
        status: "deactivated"
      },
      {
        id: "8",
        name: "Vibrant Media",
        avatar: "https://i.imgur.com/5b214c9.png",
        isPrivate: false
      },
      {
        id: "9",
        name: "Bootstrap Oldbie",
        avatar: "https://i.imgur.com/0afafdb.png",
        isPrivate: false
      },
      {
        id: "10",
        name: "VG - Van Group Community",
        avatar: "https://i.imgur.com/a144d87.png",
        isPrivate: true
      }
    ]
  }
]; 