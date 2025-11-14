export interface IAdress {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export interface IRepository {
  id: number
  name: string
  description: string | null
  html_url: string
}

export interface ICountry {
  name: {
    common: string
    official: string
  }
  capital: string[]
  population: number
  region: string
  flags: {
    png: string
    alt: string
  }
}

export interface PrimaryColorProps {
  $primaryColor?: string
}
